"use client";
import React from "react";

const data = [
  {
    name: "Purchasing Management",
    menus: [
      {
        name: "Purchase orders",
        submenus: [
          {
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

const calculateModuleSpan = (module) => {
  let output = 1;
  module.menus.forEach((menu) => {
    output += 1;
    menu.submenus.forEach((submenu) => {
      output += 2 + submenu.sub_components.length;
    });
  });
  return output;
};

const calculateMenuSpan = (menu) => {
  let output = 1;
  menu.submenus.forEach((submenu) => {
    output += 2 + submenu.sub_components.length;
  });
  return output;
};

const calculateSubMenuSpan = (submenu) => {
  return 2 + submenu.sub_components.length;
};

const generateRows = (modules) => {
  const rows = [];

  modules.forEach((module) => {
    rows.push({
      type_row: "data",
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
        component_type: module.menus[0].submenus[0].main_component.type_component,
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

    module.menus.forEach((menu, menuIndex) => {
      if (menuIndex !== 0) {
        rows.push({
          type_row: "data",
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

      menu.submenus.forEach((submenu, submenuIndex) => {
        if (submenuIndex !== 0) {
          rows.push({
            type_row: "data",
            spans: {
              module: 0,
              menu: 0,
              submenu: calculateSubMenuSpan(submenu),
            },
            data: {
              module: "",
              menu: "",
              submenu: submenu.name,
              description: submenu.description,
              component_type: submenu.main_component.type_component,
              component_name: submenu.main_component.name,
              feature: submenu.main_component.feature,
              unit: submenu.main_component.unit,
              md_pm: submenu.main_component.md_pm,
              md_sa: submenu.main_component.md_sa,
              md_se: submenu.main_component.md_se,
              md_ui: submenu.main_component.md_ui,
              md_qa: submenu.main_component.md_qa,
            },
          });
        }

        submenu.sub_components.forEach((subcomp) => {
          rows.push({
            type_row: "data",
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
          name_row: "+ ADD",
          spans: {
            module: 0,
            menu: 0,
            submenu: 0,
          },
        });

        if (submenuIndex === menu.submenus.length - 1) {
          rows.push({
            type_row: "button",
            name_row: "+ ADD",
            spans: {
              module: 0,
              menu: 0,
              submenu: 0,
            },
          });
        }
      });

      if (menuIndex === module.menus.length - 1) {
        rows.push({
          type_row: "button",
          name_row: "+ ADD",
          spans: {
            module: 0,
            menu: 0,
            submenu: 0,
          },
        });
      }
    });
  });

  return rows;
};

const Table = () => {
  const rows = generateRows(data);

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Module</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Menu</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Submenu</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Description</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Component Type</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Component Name</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Feature</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Unit</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">MD PM</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">MD SA</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">MD SE</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">MD UI</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">MD QA</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          if (row.type_row === "data") {
            return (
              <tr key={index} className="hover:bg-gray-100">
                {row.spans.module > 0 && (
                  <td
                    rowSpan={row.spans.module}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {row.data.module}
                  </td>
                )}
                {row.spans.menu > 0 && (
                  <td
                    rowSpan={row.spans.menu}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {row.data.menu}
                  </td>
                )}
                {row.spans.submenu > 0 && (
                  <>
                    <td
                      rowSpan={row.spans.submenu}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row.data.submenu}
                    </td>
                    <td
                      rowSpan={row.spans.submenu}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row.data.description}
                    </td>
                  </>
                )}
                {row.data.component_type && (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.data.component_type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.data.component_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.data.feature}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.data.unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.data.md_pm}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.data.md_sa}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.data.md_se}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.data.md_ui}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.data.md_qa}
                    </td>
                  </>
                )}
              </tr>
            );
          } else if (row.type_row === "button") {
            return (
              <tr key={index}>
                <td
                  colSpan="1"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-[12px]">
                    {row.name_row}
                  </button>
                </td>
                <td colSpan="13" className="border border-gray-300 px-4 py-2 text-center"></td>
              </tr>
            );
          }
          return null;
        })}
        <tr>
          <td colSpan="13" className="border border-gray-300 px-4 py-2 text-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-[11px]">
              ADD NEW MODULE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;