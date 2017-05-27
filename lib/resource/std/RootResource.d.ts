/// <reference types="node" />
import { IResource, SimpleCallback, ReturnCallback, Return2Callback, ResourceType } from '../IResource';
import { Readable } from 'stream';
import { StandardResource } from './StandardResource';
import { ResourceChildren } from './ResourceChildren';
export declare class RootResource extends StandardResource {
    children: ResourceChildren;
    constructor();
    create(callback: SimpleCallback): void;
    delete(callback: SimpleCallback): void;
    moveTo(parent: IResource, newName: string, overwrite: boolean, callback: SimpleCallback): void;
    rename(newName: string, callback: Return2Callback<string, string>): void;
    webName(callback: ReturnCallback<string>): void;
    type(callback: ReturnCallback<ResourceType>): void;
    append(data: Int8Array, targetSource: boolean, callback: SimpleCallback): void;
    write(data: Int8Array, targetSource: boolean, callback: SimpleCallback): void;
    read(targetSource: boolean, callback: ReturnCallback<Int8Array | Readable>): void;
    mimeType(targetSource: boolean, callback: ReturnCallback<string>): void;
    size(targetSource: boolean, callback: ReturnCallback<number>): void;
    addChild(resource: IResource, callback: SimpleCallback): void;
    removeChild(resource: IResource, callback: SimpleCallback): void;
    getChildren(callback: ReturnCallback<IResource[]>): void;
}
