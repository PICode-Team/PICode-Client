export interface ICodeContent {
    data: any;
    path: string;
    name: string;
    focus: boolean;
}

export interface IChildrenState {
    left?: IWraper;
    right?: IWraper;
    bottom?: IWraper;
    top?: IWraper;
}

export interface IWraper {
    width: string;
    height: string;
    wrapper?: IChildrenState;
    children?: ICodeContent[];
}

export interface ICodeChildState {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}
