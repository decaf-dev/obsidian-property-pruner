import { App, PluginSettingTab } from "obsidian";
import PropertyPrunerPlugin from "src/main";

export default class PropertyPrunerSettingsTab extends PluginSettingTab {
	plugin: PropertyPrunerPlugin;

	constructor(app: App, plugin: PropertyPrunerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
	}
}
