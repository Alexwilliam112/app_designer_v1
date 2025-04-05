import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data }) => {
  const [isToolbarVisible, setToolbarVisible] = useState(false);

  const handleClick = () => {
    setToolbarVisible(!isToolbarVisible); // Toggle toolbar visibility
  };

  return (
    <div className="flex flex-col gap-3 self-stretch bg-[#1b1d20] p-[15px] rounded-lg border border-solid border-[#37383b]">
      {/* Header */}
      <div className="flex justify-between items-center self-stretch h-6 px-3 rounded-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5">
            <svg className="w-[16.66666603088379px] h-[15.833889961242676px]"></svg>
          </div>
          <span className="font-medium text-[14px] text-[#e1e1e1]">
            {data.systemName || "System Name"}
          </span>
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="w-4 h-4">
            <svg className="w-[10.218951225280762px] h-[10.218951225280762px]"></svg>
          </div>
          <span className="font-black text-[12px] leading-[11.5%] text-center text-[#e1e1e1]">
            
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 self-stretch">
        {/* Module */}
        <div className="flex justify-between items-center self-stretch px-3">
          <span className="font-medium text-[14px] text-[#e1e1e1]">Module</span>
          <div className="w-[200px] h-[25px] flex items-center gap-[15px] bg-[#0f1114] px-[15px] py-[5px] rounded">
            <div className="w-4 h-4">
              <svg className="w-3 h-[10.666666984558105px]"></svg>
            </div>
            <span className="font-medium text-[14px] text-white">
              {data.moduleName || "module name"}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="flex justify-between items-center self-stretch px-3">
          <span className="font-medium text-[14px] text-[#e1e1e1]">
            Category
          </span>
          <div className="w-[200px] h-[25px] flex items-center gap-[15px] bg-[#0f1114] px-[15px] py-[5px] rounded">
            <div className="w-4 h-4">
              <svg className="w-3 h-[10.666666984558105px]"></svg>
            </div>
            <span className="font-medium text-[14px] text-white">
              {data.category || "Integration"}
            </span>
          </div>
        </div>

        {/* Type */}
        <div className="flex justify-between items-center self-stretch px-3">
          <span className="font-medium text-[14px] text-[#e1e1e1]">Type</span>
          <div className="w-[200px] h-[25px] flex items-center gap-[15px] bg-[#0f1114] px-[15px] py-[5px] rounded">
            <div className="w-4 h-4">
              <svg className="w-3 h-[10.666666030883789px]"></svg>
            </div>
            <span className="font-medium text-[14px] text-white">
              {data.type || "Data Source"}
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      {isToolbarVisible && (
        <div className="flex flex-col gap-2.5 bg-[#1b1d20] px-[15px] py-2.5 rounded-lg border border-solid border-[#37383b]">
          <div className="flex items-center gap-2 self-stretch bg-[#0f1114] px-3 py-[5px] rounded">
            <div className="w-5 h-5">
              <svg className="w-[15px] h-[15px]"></svg>
            </div>
            <span className="font-medium text-[14px] text-[#757575]">Search</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-6 flex items-center gap-3 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#898989]">
                  UTILITY
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5">
                  <svg className="w-[16.66666603088379px] h-[16.66666603088379px]"></svg>
                </div>
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Decision
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-6 flex items-center gap-3 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#898989]">
                  APP BUILDER
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Master Data
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Configuration
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Administrator
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Requestor Menu
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Approver Menu
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[13.5px] h-[12.000000953674316px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Custom UI
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-6 flex items-center gap-3 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#898989]">
                  LOWCODE
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Lowcode Data Entry
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Lowcode Dashboard
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Lowcode Portal
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-6 flex items-center gap-3 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#898989]">
                  WORKFLOW
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Integration Core Product
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Integration Client System
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Integration Ext. System
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-[13px] px-1 rounded-lg">
              <svg className="w-3.5 h-[18px]"></svg>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Automation Block
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-6 flex items-center gap-3 px-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#898989]">
                  INSIGHT
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.966202735900879px] h-[14.961645126342773px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Dashboard Builder
                </span>
              </div>
            </div>
            <div className="h-6 flex items-center gap-2 px-1 rounded-lg">
              <div className="w-[18px] h-[18px]">
                <svg className="w-[14.966202735900879px] h-[14.961645126342773px]"></svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[14px] text-[#bbbcbd]">
                  Custom Reports
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "#1b1d20",
          border: "2px solid #e1e1e1",
          borderRadius: "50%",
        }}
        className="custom-handle"
        onClick={handleClick} // Add click event to toggle toolbar
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "#1b1d20",
          border: "2px solid #e1e1e1",
          borderRadius: "50%",
        }}
        className="custom-handle"
        onClick={handleClick} // Add click event to toggle toolbar
      />

      {/* Add custom CSS for the plus sign */}
      <style>
        {`
          .custom-handle::before {
            content: '+';
            position: absolute;
            color: #e1e1e1;
            font-size: 12px;
            font-weight: bold;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default CustomNode;
