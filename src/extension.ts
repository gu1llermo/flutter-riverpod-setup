import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
const execPromise = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('flutter-riverpod-setup.setupProject', async () => {
        // Ensure a workspace folder is open
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('Please open a Flutter project folder');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
        try {
            // Packages to install
            const packages = [
                'flutter_riverpod',
                'riverpod_annotation',
                'dev:riverpod_generator',
                'dev:build_runner',
                'dev:custom_lint',
                'dev:riverpod_lint'
            ];
            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Setting up Flutter Riverpod',
                cancellable: false
            }, async (progress) => {
                // Install packages
                progress.report({ increment: 0, message: 'Installing packages...' });
                for (const packageName of packages) {
                    await execPromise(`flutter pub add ${packageName}`, { cwd: workspaceFolder });
                }
                // Update or create analysis_options.yaml
                progress.report({ increment: 50, message: 'Configuring analysis options...' });
                const analysisOptionsPath = path.join(workspaceFolder, 'analysis_options.yaml');
                
                let content = '';
                if (fs.existsSync(analysisOptionsPath)) {
                    content = fs.readFileSync(analysisOptionsPath, 'utf8');
                }
                if (!content.includes('custom_lint')) {
                    const updatedContent = content + '\n\nanalyzer:\n  plugins:\n    - custom_lint';
                    fs.writeFileSync(analysisOptionsPath, updatedContent);
                }
                // Optionally run code generation (commented out by default)
                // progress.report({ increment: 75, message: 'Generating code...' });
                // await execPromise('dart run build_runner build', { cwd: workspaceFolder });
                progress.report({ increment: 100, message: 'Setup completed!' });
            });
            vscode.window.showInformationMessage('Flutter Riverpod setup completed successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Setup failed: ${error instanceof Error ? error.message : error}`);
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}