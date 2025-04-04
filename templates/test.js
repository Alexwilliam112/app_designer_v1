function calculateModuleSpan(module) {
  let output = 1;

  const menus = module.menus;
  menus.forEach((menu) => {
    output += 1;
    const submenus = menu.submenus;
    submenus.forEach((submenu) => {
      output += 2;
      output += submenu.sub_components.length;
    });
  });

  return output;
}

function calculateMenuSpan(menu) {
  let output = 1;

  const submenus = menu.submenus;
  submenus.forEach((submenu) => {
    output += 2;
    output += submenu.sub_components.length;
  });

  return output;
}

function calculateSubMenuSpan(submenu) {
  let output = 0;
  output += 2;
  output += submenu.sub_components.length;

  return output;
}

function generateRows(modules) {
  const rows = [];

  modules.forEach((module) => {
    rows.push({
      type_row: "data",
      name_row: "data",
      spans: {
        module: calculateModuleSpan(module),
        menu: calculateMenuSpan(module.menus[0]),
        submenu: calculateSubMenuSpan(module.menus[0].submenus[0]),
      },
      data: {
        module: module.name,
        menu: module.menus[0].name,
        submenu: module.menus[0].submenus[0].name,
        description: module.menus[0].submenus[0].description,
        component_type:
          module.menus[0].submenus[0].main_component.type_component,
        component_name: module.menus[0].submenus[0].main_component.name,
        feature: module.menus[0].submenus[0].main_component.feature,
        unit: module.menus[0].submenus[0].main_component.unit,
        md_pm: module.menus[0].submenus[0].main_component.md_pm,
        md_sa: module.menus[0].submenus[0].main_component.md_sa,
        md_se: module.menus[0].submenus[0].main_component.md_se,
        md_ui: module.menus[0].submenus[0].main_component.md_ui,
        md_qa: module.menus[0].submenus[0].main_component.md_qa,
      },
    });

    const menus = module.menus;
    for (let j = 0; j < menus.length; j++) {
      const menu = menus[j];
      const submenus = menu.submenus;

      if (j !== 0) {
        //push the menu row only if it is not the first menu
        rows.push({
          type_row: "data",
          name_row: "data",
          spans: {
            module: 0,
            menu: calculateMenuSpan(menu),
            submenu: calculateSubMenuSpan(menu.submenus[0]),
          },
          data: {
            module: "",
            menu: menu.name,
            submenu: menu.submenus[0].name,
            description: menu.submenus[0].description,
            component_type: menu.submenus[0].main_component.type_component,
            component_name: menu.submenus[0].main_component.name,
            feature: menu.submenus[0].main_component.feature,
            unit: menu.submenus[0].main_component.unit,
            md_pm: menu.submenus[0].main_component.md_pm,
            md_sa: menu.submenus[0].main_component.md_sa,
            md_se: menu.submenus[0].main_component.md_se,
            md_ui: menu.submenus[0].main_component.md_ui,
            md_qa: menu.submenus[0].main_component.md_qa,
          },
        });
      }

      for (let i = 0; i < submenus.length; i++) {
        const sub_components = submenus[i].sub_components;
        if (i !== 0) {
          //push the submenu row only if it is not the first submenu
          rows.push({
            type_row: "data",
            name_row: "data",
            spans: {
              module: 0,
              menu: 0,
              submenu: calculateSubMenuSpan(submenus[i]),
            },
            data: {
              module: "",
              menu: "",
              submenu: submenus[i].name,
              description: submenus[i].description,
              component_type: submenus[i].main_component.type_component,
              component_name: submenus[i].main_component.name,
              feature: submenus[i].main_component.feature,
              unit: submenus[i].main_component.unit,
              md_pm: submenus[i].main_component.md_pm,
              md_sa: submenus[i].main_component.md_sa,
              md_se: submenus[i].main_component.md_se,
              md_ui: submenus[i].main_component.md_ui,
              md_qa: submenus[i].main_component.md_qa,
            },
          });
        }

        sub_components.forEach((subcomp) => {
          rows.push({
            type_row: "data",
            name_row: "data",
            spans: {
              module: 0,
              menu: 0,
              submenu: 0,
            },
            data: {
              module: "",
              menu: "",
              submenu: "",
              description: "",
              component_type: subcomp.type_component,
              component_name: subcomp.name,
              feature: subcomp.feature,
              unit: subcomp.unit,
              md_pm: subcomp.md_pm,
              md_sa: subcomp.md_sa,
              md_se: subcomp.md_se,
              md_ui: subcomp.md_ui,
              md_qa: subcomp.md_qa,
            },
          });
        });

        rows.push({
          type_row: "button",
          name_row: "COMPONENT",
          spans: {
            module: 0,
            menu: 0,
            submenu: 0,
          },
          data: {},
        });

        if (i === submenus.length - 1) {
          //? push add submenu button
          rows.push({
            type_row: "button",
            name_row: "SUBMENU",
            spans: {
              module: 0,
              menu: 0,
              submenu: 0,
            },
            data: {},
          });
        }
      }

      if (j === menus.length - 1) {
        //? push add menu button
        rows.push({
          type_row: "button",
          name_row: "MENU",
          spans: {
            module: 0,
            menu: 0,
            submenu: 0,
          },
          data: {},
        });
      }
    }
  });

  return rows;
}

const data = [
  {
    name: "Purchasing Management",
    menus: [
      {
        name: "Purchase orders",
        submenus: [
          {
            id_record: "",
            name: "Request PO",
            description: "Request PORequest PORequest PORequest PO",
            main_component: {
              id_component: "AUT",
              type_component: "MAIN",
              name: "REQUESTOR TABLE",
              feature: "feature of component",
              unit: "unit of component",
              md_pm: 2,
              md_sa: 3,
              md_se: 4,
              md_ui: 1,
              md_qa: 2,
            },
            sub_components: [
              {
                id_component: "AUT",
                type_component: "SUB-COMPONENT",
                name: "AUTOMATIONS",
                feature: "feature of component",
                unit: "unit of component",
                md_pm: 2,
                md_sa: 3,
                md_se: 4,
                md_ui: 1,
                md_qa: 2,
              },
            ],
          },
          {
            id_record: "",
            name: "Approval PO",
            description:
              "Approval POApproval POApproval POApproval POApproval PO",
            main_component: {
              id_component: "id of component",
              type_component: "MAIN",
              name: "APPROVER TABLE",
              feature: "feature of component",
              unit: "unit of component",
              md_pm: 2,
              md_sa: 3,
              md_se: 4,
              md_ui: 1,
              md_qa: 2,
            },
            sub_components: [],
          },
        ],
      },
      {
        name: "Purchase Requisition",
        submenus: [
          {
            id_record: "",
            name: "Request PR",
            description: "Request PRRequest PRRequest PRRequest PRRequest PR",
            main_component: {
              id_component: "id of component",
              type_component: "MAIN",
              name: "REQUESTOR TABLE PR",
              feature: "feature of component",
              unit: "unit of component",
              md_pm: 2,
              md_sa: 3,
              md_se: 4,
              md_ui: 1,
              md_qa: 2,
            },
            sub_components: [
              {
                id_component: "id of component",
                type_component: "SUB-COMPONENT",
                name: "AUTOMATION PDF",
                feature: "feature of component",
                unit: "unit of component",
                md_pm: 2,
                md_sa: 3,
                md_se: 4,
                md_ui: 1,
                md_qa: 2,
              },
            ],
          },
          {
            id_record: "",
            name: "Approval PR",
            description: "Approval PRApproval PRApproval PRApproval PR",
            main_component: {
              id_component: "id of component",
              type_component: "MAIN",
              name: "APPROVER TABLE PR",
              feature: "feature of component",
              unit: "unit of component",
              md_pm: 2,
              md_sa: 3,
              md_se: 4,
              md_ui: 1,
              md_qa: 2,
            },
            sub_components: [],
          },
        ],
      },
    ],
  },
];

let sampleRows = generateRows(data);
let html = generateHTML(sampleRows);
console.log(html);

function generateHTML(data) {
  let html = "";

  data.forEach((row) => {
    if (row.type_row === "data") {
      html += `<tr>\n`;

      if (row.spans.module > 0) {
        html += `  <td rowspan="${row.spans.module}">${row.data.module}</td>\n`;
      }
      if (row.spans.menu > 0) {
        html += `  <td rowspan="${row.spans.menu}">${row.data.menu}</td>\n`;
      }
      if (row.spans.submenu > 0) {
        html += `  <td rowspan="${row.spans.submenu}">${row.data.submenu}</td>\n`;
        html += `  <td rowspan="${row.spans.submenu}">${row.data.description}</td>\n`;
      }

      if (row.data.component_type) {
        html += `  <td rowspan="1">${row.data.component_type}</td>\n`;
        html += `  <td rowspan="1">${row.data.component_name}</td>\n`;
        html += `  <td rowspan="1">${row.data.feature}</td>\n`;
        html += `  <td rowspan="1">${row.data.unit}</td>\n`;
        html += `  <td rowspan="1">${row.data.md_pm}</td>\n`;
        html += `  <td rowspan="1">${row.data.md_sa}</td>\n`;
        html += `  <td rowspan="1">${row.data.md_se}</td>\n`;
        html += `  <td rowspan="1">${row.data.md_ui}</td>\n`;
        html += `  <td rowspan="1">${row.data.md_qa}</td>\n`;
      }

      html += `</tr>\n`;
    } else if (row.type_row === "button") {
      if (row.name_row === "COMPONENT") {
        html += `<tr>\n  <td colspan="1"><button>ADD COMPONENT</button></td><td colspan="8"></td>\n</tr>\n`;
      } else if (row.name_row === "SUBMENU") {
        html += `<tr>\n  <td colspan="1"><button>ADD SUB-MENU</button></td><td colspan="10"></td>\n</tr>\n`;
      } else if (row.name_row === "MENU") {
        html += `<tr>\n  <td colspan="1"><button>ADD MENU</button></td><td colspan="11"></td>\n</tr>\n`;
      }
    }
  });

  html += `<tr>\n  <td colspan="13"><button>ADD NEW MODULE</button></td>\n</tr>\n`;

  return html;
}
