import { Plugin } from "obsidian";
import PropertyPrunerModal from "./obsidian/property-pruner-modal";

interface PropertyPrunerSettings {}

const DEFAULT_SETTINGS: PropertyPrunerSettings = {};

export default class PropertyPrunerPlugin extends Plugin {
	settings: PropertyPrunerSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "prune-property",
			name: "Prune a property",
			callback: () => {
				new PropertyPrunerModal(this.app).open();
			},
		});

		// this.addSettingTab(new PropertyPrunerSettingsTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
