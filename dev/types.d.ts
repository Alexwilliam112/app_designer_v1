import { Node } from "@xyflow/react"

declare global {
    interface ForeignObj {
        id: string
        name: string
    }

    interface ComponentNodeData extends Record<string, unknown> {
        id: string
        menuName: string
        targetPosition: 'top' | 'bottom' | 'right' | 'left' | ''
        component: Feature
    }

    interface DecisionNodeData extends Record<string, unknown> {
        id: string
        targetPosition: 'top' | 'bottom' | 'right' | 'left' | ''
    }

    type GeneralNode = Node<ComponentNodeData> | Node<DecisionNodeData>

    interface Feature {
        id_component: string
        title: string
        description: string
        category: string
        type: string
        module: ForeignObj
        features: ForeignObj[]
    }

    interface BaseComponent {
        _id: string;
        description: string;
        id_component: string;
        name: string;
        type_of_custom: string;
    }

    interface ComponentGroup {
        id: string;
        label: string;
        items: ComponentItem[];
    }

    interface ComponentItem {
        id_component: string;
        id: string;
        label: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }

    interface EstimationData {
        _id: string;
        base_mh: number;
        baseline_mh: number;
        component_id: string;
        component_name: string;
        component_type: string;
        created_at: number;
        created_by: number;
        description: string;
        effort: string;
        estimation_id: string;
        feature: string;
        fixing_mh: number;
        id_detail: string;
        issue_mh: number;
        likelihood: number;
        md_pm: number;
        md_qa: number;
        md_sa: number;
        md_se: number;
        md_ui: number;
        menu: string;
        module: string;
        risk: number;
        submenu: string;
        total_md: number;
        unit: string;
        updated_at: number;
        updated_by: number;
    }
}

export { }