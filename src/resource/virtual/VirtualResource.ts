import { IResource, SimpleCallback, ReturnCallback, Return2Callback, ResourceType } from '../IResource'
import { Readable, ReadableOptions } from 'stream'
import { FSManager, FSPath } from '../../manager/FSManager'
import { VirtualFSManager } from '../../manager/VirtualFSManager'
import { StandardResource } from '../std/StandardResource'

export abstract class VirtualResource extends StandardResource
{
    name : string

    constructor(name : string, parent ?: IResource, fsManager ?: FSManager)
    {
        if(!fsManager)
            if(parent && parent.fsManager && parent.fsManager.constructor === VirtualFSManager)
                fsManager = parent.fsManager;
            else
                fsManager = new VirtualFSManager();

        super(parent, fsManager);

        this.name = name;
    }
    
    // ****************************** Actions ****************************** //
    create(callback : SimpleCallback)
    {
        callback(null);
    }
    delete(callback : SimpleCallback)
    {
        this.removeFromParent(callback);
    }
    moveTo(parent : IResource, newName : string, overwrite : boolean, callback : SimpleCallback)
    {
        if(parent === this.parent)
        {
            this.rename(newName, (e, oldName, newName) => {
                callback(e);
            })
            return;
        }

        const oldName = this.name;
        this.name = newName;
        this.removeFromParent((e) => {
            if(e)
            {
                this.name = oldName;
                callback(e);
            }
            else
                parent.addChild(this, (e) => {
                    callback(e);
                })
        })
    }
    rename(newName : string, callback : Return2Callback<string, string>)
    {
        const oldName = this.name;
        this.name = newName;
        callback(null, oldName, newName);
    }
    
    // ****************************** Std meta-data ****************************** //
    webName(callback : ReturnCallback<string>)
    {
        callback(null, this.name);
    }
    abstract type(callback : ReturnCallback<ResourceType>)

    // ****************************** Content ****************************** //
    abstract append(data : Int8Array, targetSource : boolean, callback : SimpleCallback)
    abstract write(data : Int8Array, targetSource : boolean, callback : SimpleCallback)
    abstract read(targetSource : boolean, callback : ReturnCallback<Int8Array|Readable>)
    abstract mimeType(targetSource : boolean, callback : ReturnCallback<string>)
    abstract size(targetSource : boolean, callback : ReturnCallback<number>)
    
    // ****************************** Children ****************************** //
    abstract addChild(resource : IResource, callback : SimpleCallback)
    abstract removeChild(resource : IResource, callback : SimpleCallback)
    abstract getChildren(callback : ReturnCallback<IResource[]>)
}
