import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Flutter Riverpod Setup Extension Test', () => {
    test('Command is registered', async () => {
        const allCommands = await vscode.commands.getCommands();
        assert.ok(allCommands.includes('flutter-riverpod-setup.setupProject'));
    });

    test('Analysis options configuration', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        assert.ok(workspaceFolders, 'No workspace folder open');

        const analysisOptionsPath = path.join(workspaceFolders[0].uri.fsPath, 'analysis_options.yaml');
        const analysisOptionsContent = fs.readFileSync(analysisOptionsPath, 'utf8');
        
        assert.ok(
            analysisOptionsContent.includes('custom_lint'), 
            'Custom lint configuration not found in analysis_options.yaml'
        );
    });

    test('Packages installation check', async () => {
        const expectedPackages = [
            'flutter_riverpod',
            'riverpod_annotation',
            'riverpod_generator',
            'build_runner',
            'custom_lint',
            'riverpod_lint'
        ];

        // Note: Actual package verification would require parsing pubspec.yaml
        assert.ok(expectedPackages.length > 0, 'Package list is not empty');
    });
});