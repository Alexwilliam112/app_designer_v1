import { memo } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data }) => {
  return (
    <>
      <div class="flex flex-col gap-2.5 bg-[#1b1d20] px-[15px] py-2.5 rounded-lg border border-solid border-[#37383b]">
        <div class="flex items-center gap-2 self-stretch bg-[#0f1114] px-3 py-[5px] rounded">
          <div class="w-5 h-5">
            <svg class="w-[15px] h-[15px]"></svg>
          </div>
          <span class="font-medium text-[14px] text-[#757575]">Search</span>
        </div>
        <div class="flex flex-col gap-[5px]">
          <div class="h-6 flex items-center gap-3 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#898989]">
                UTILITY
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5">
                <svg class="w-[16.66666603088379px] h-[16.66666603088379px]"></svg>
              </div>
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Decision
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[5px]">
          <div class="h-6 flex items-center gap-3 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#898989]">
                APP BUILDER
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Master Data
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Configuration
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Administrator
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Requestor Menu
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Approver Menu
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[13.5px] h-[12.000000953674316px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Custom UI
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[5px]">
          <div class="h-6 flex items-center gap-3 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#898989]">
                LOWCODE
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Lowcode Data Entry
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Lowcode Dashboard
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.02500057220459px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Lowcode Portal
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[5px]">
          <div class="h-6 flex items-center gap-3 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#898989]">
                WORKFLOW
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Integration Core Product
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Integration Client System
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.999999046325684px] h-[14.250500679016113px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Integration Ext. System
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-[13px] px-1 rounded-lg">
            <svg class="w-3.5 h-[18px]"></svg>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Automation Block
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[5px]">
          <div class="h-6 flex items-center gap-3 px-1 rounded-lg">
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#898989]">
                INSIGHT
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.966202735900879px] h-[14.961645126342773px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Dashboard Builder
              </span>
            </div>
          </div>
          <div class="h-6 flex items-center gap-2 px-1 rounded-lg">
            <div class="w-[18px] h-[18px]">
              <svg class="w-[14.966202735900879px] h-[14.961645126342773px]"></svg>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[14px] text-[#bbbcbd]">
                Custom Reports
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CustomNode);
