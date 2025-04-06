declare global {
    interface ForeignObj {
        id: string
        name: string
    }

    interface ModuleId {
        id_module: string
        name: string
    }

    interface ComponentNodeData extends Record<string, unknown> {
        id: string
        menuName: string
        targetPosition: 'top' | 'bottom' | 'right' | 'left' | ''
        component: Feature
    }

    interface Feature {
        id_component: string
        title: string
        description: string
        module: ModuleId
        category: string
        type: string
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
}

export { }