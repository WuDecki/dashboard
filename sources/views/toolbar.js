import {JetView} from "webix-jet";

export default class ToolbarView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		
		return {
			view:"toolbar",
			css:theme,
			height:56,
			elements:[
				{
					paddingY:5,
					rows:[
						{
							margin:8,
							cols:[
								{
									view:"label",
									label:_("SIWB - DASHBOARD"),
									width: "auto",
									css:"main_label",
									batch:"default"
								},
								{ batch:"default" },
								{
									localId:"search",
									margin:0,
									batch:"search",
									hidden:true,
									cols:[
										{ width:11 },
										{
											view:"text", localId:"lookup",
											placeholder:"Type in to look for a task",
											on:{
												onKeyPress(code){
													const lookup = this.getValue();
													if (code === 13){
														const nav_btn = this.$scope.$$("favs");
														if (nav_btn.config.icon.indexOf("check") !== -1){
															nav_btn.config.icon = "mdi mdi-view-dashboard";
															nav_btn.config.tooltip = "Go back to the dashboard";
															nav_btn.refresh();
														}
														this.$scope.show("projects" + (lookup ? "?lookup="+lookup : ""));
													}
												}
											}
										},
										{
											view:"icon", icon:"mdi mdi-close",
											click:() => this.toggleBatches("default","search")
										}
									]
								},
								{
									view:"icon", icon:"mdi mdi-bookmark-check",
									localId:"favs", batch:"default",
									click:function(){
										if (this.config.icon.indexOf("check") !== -1)
											this.$scope.show("projects");
										else
											this.$scope.show("dashboard");
									}
								},
							]
						}
					]
				},
				{ width:4 }
			]
		};
	}
	urlChange(ui,url){
		const _ = this.app.getService("locale")._;
		let nav_btn = this.$$("favs");
		if (url[1].page === "projects"){
			nav_btn.config.icon = "mdi mdi-view-dashboard";
			nav_btn.define("tooltip",_("Go back to the dashboard"));
		}
		else if (url[1].page === "dashboard"){
			nav_btn.config.icon = "mdi mdi-bookmark-check";
			nav_btn.define("tooltip",_("Open the list of all tasks"));
		}
		nav_btn.refresh();
	}
	toggleBatches(a,b){
		const s_btns = this.getRoot().queryView({ batch:a },"all");
		for (let i = 0; i < s_btns.length; i++)
			s_btns[i].show();
		const h_btns = this.getRoot().queryView({ batch:b },"all");
		for (let i = 0; i < h_btns.length; i++)
			h_btns[i].hide();
	}
}
