import { App, Modal, Notice } from "obsidian";

import "./styles.css";

export default class PropertyPrunerModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		const modalEl = contentEl.closest(".modal");
		if (modalEl) {
			modalEl.addClass("property-pruner-modal");
		}

		const formEl = contentEl.createEl("form");
		formEl.addEventListener("submit", async (event) => {
			event.preventDefault();

			const formData = new FormData(formEl);
			const propertyName = formData.get("property-name");

			if (!propertyName) return;

			try {
				new Notice(
					`Property Pruner - Pruning property: ${propertyName}...`
				);
				const result = await this.pruneProperty(
					propertyName.toString()
				);
				new Notice(
					`Property Pruner - Pruned property: ${propertyName} from ${result} files`
				);
				this.close();
			} catch (err) {
				new Notice(
					`Property Pruner - Failed to prune property: ${propertyName}`
				);
				console.error(err);
			}
		});
		formEl.createEl("input", {
			cls: "property-pruner-input",
			attr: {
				name: "property-name",
				type: "text",
				placeholder: "Enter a property name...",
			},
		});
		formEl.createDiv({
			cls: "property-pruner-text",
			text: "Press enter to prune",
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	private async pruneProperty(propertyName: string) {
		const { vault } = this.app;
		const files = vault.getMarkdownFiles();

		let numPruned = 0;

		for (const file of files) {
			await this.app.fileManager.processFrontMatter(
				file,
				(frontmatter) => {
					if (frontmatter[propertyName]) {
						delete frontmatter[propertyName];
						numPruned++;
					}
				}
			);
		}

		return numPruned;
	}
}
