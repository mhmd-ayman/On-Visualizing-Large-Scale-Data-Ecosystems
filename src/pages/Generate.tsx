import React, {useState} from 'react';
import {InitForm} from "../helpers/InitForm";
import {clearDataBase, startGenerateToFile, Item, generateFromFile, startGenerateToDataBase} from "../helpers/generateData"
import {CSVLink} from "react-csv";
import {log} from "util";


var nodesList;
var relationsList;

function Generate() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const {
        generatingState,
        setGeneratingState,
        formData,
        setFormData,
        handleChange,
        setErrorMessages,
        renderErrorMessage
    } = InitForm();


    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     event.target.files[0] && setIsFilePicked(true);
    // };
    const handleSubmission =  async() => {
        // HANDLING FILE AS SENDING FILE INTO BACKEND
        await generateFromFile(formData.nodeFile,formData.relFile)
    };


    const doClean = async event => {
        await clearDataBase();
        console.log('done clearing')
        setTimeout(() => {
            setGeneratingState(3);
            setFormData({reset: true})
            setErrorMessages({name: "name", message: "test error message"});
        }, 1000)
    }

    const doGenerate = async event => {
        setGeneratingState(1);
        if (formData.type == 'Random') {

            let keeper = new Item("Keeper", 1, 20);
            let marketPlace = new Item("Marketplace", 1, 20);
            let exeManager = new Item("ExecutionManager", 1, 20);
            let nodeExecutor = new Item('NodeExecutor', 1, 20);
            let assetManager = new Item('AssetManager', 1, 20);
            let searchEngine = new Item("SearchEngine", 1, 20);
            let numOfDays = Math.round(Math.random() * 40);
            var startTime = performance.now()
            await startGenerateToDataBase(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine,Math.round(Math.random() * 40),Math.round(Math.random() * 40) )

            var endTime = performance.now()
            var time=endTime - startTime
            alert('The generating took '+ time+' milliseconds')
        } else if (formData.type == 'Ranges') {
            //alert(Object.entries(formData))

            let keeper = new Item("Keeper", formData.Keeper_min, formData.Keeper_max);
            let marketPlace = new Item("Marketplace", formData.Marketplace_min, formData.Marketplace_max);
            let exeManager = new Item("ExecutionManager", formData.ExecutionManager_min, formData.ExecutionManager_max);
            let nodeExecutor = new Item('NodeExecutor', formData.NodeExecutor_min, formData.NodeExecutor_max);
            let assetManager = new Item('AssetManager', formData.AssetManager_min, formData.AssetManager_max);
            let searchEngine = new Item("SearchEngine", formData.SearchEngine_min, formData.SearchEngine_max);
            let numOfDays = formData.DaysNumber
            var startTime = performance.now()
            await startGenerateToDataBase(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine, formData.NumOfAdd, formData.NumOfDelete)//, formData.NumOfEdgeAdded,formData.NumOfEdgeDeleted)
            var endTime = performance.now()
            var time=endTime - startTime
            alert('The generating took '+ time+' milliseconds')

        } else if (formData.type == 'Logicly') {

            let numOfKeeper4Component = Math.round(formData.NumOfKeeper );
            let keeper = new Item("Keeper", numOfKeeper4Component);
            let numOfMarketplace4Keeper = Math.round(formData.NumOfMarketplace / formData.NumOfKeeper);
            let marketPlace = new Item("Marketplace", numOfMarketplace4Keeper);

            let exeManager = new Item("ExecutionManager", Math.round(formData.NumOfExecutionManager / formData.NumOfMarketplace));
            let nodeExecutor = new Item('NodeExecutor', Math.round(formData.NumOfNodeExecutor / formData.NumOfExecutionManager));
            let assetManager = new Item('AssetManager', Math.round(formData.NumOfAssetManager / formData.NumOfNodeExecutor));
            let searchEngine = new Item("SearchEngine", Math.round(formData.NumOfSearchEngine / formData.NumOfKeeper));
            let numOfDays = formData.DaysNumber
            var startTime = performance.now()
            await startGenerateToDataBase(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine, formData.NumOfAdd,formData.NumOfDelete,)//,  formData.NumOfEdgeAdded,formData.NumOfEdgeDeleted)

            var endTime = performance.now()
            var time=endTime - startTime
           alert('The generating took '+ time+' milliseconds')
        } else if (formData.type == 'fromFile') {

        }
        setTimeout(() => {
            setGeneratingState(2);
            setFormData({reset: true})
            setErrorMessages({name: "name", message: "test error message"});
        }, 1000)
    }

    const doGenerateToFile = async event => {
        setGeneratingState(1);
        if (formData.type == 'Random') {

            let keeper = new Item("Keeper", 1, 20);
            let marketPlace = new Item("Marketplace", 1, 20);
            let exeManager = new Item("ExecutionManager", 1, 20);
            let nodeExecutor = new Item('NodeExecutor', 1, 20);
            let assetManager = new Item('AssetManager', 1, 20);
            let searchEngine = new Item("SearchEngine", 1, 20);
            let numOfDays = Math.round(Math.random() * 40);
            console.log('num of days on random generate:'+ numOfDays
            )
            var startTime = performance.now()
             var lists = await startGenerateToFile(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine)

            var endTime = performance.now()
            var time=endTime - startTime
            alert('The generating took '+ time+' milliseconds')
             nodesList = lists[0];
            relationsList=lists[1];

        } else if (formData.type == 'Ranges') {
            //alert(Object.entries(formData))
            let keeper = new Item("Keeper", formData.Keeper_min, formData.Keeper_max);
            let marketPlace = new Item("Marketplace", formData.Marketplace_min, formData.Marketplace_max);
            let exeManager = new Item("ExecutionManager", formData.ExecutionManager_min, formData.ExecutionManager_max);
            let nodeExecutor = new Item('NodeExecutor', formData.NodeExecutor_min, formData.NodeExecutor_max);
            let assetManager = new Item('AssetManager', formData.AssetManager_min, formData.AssetManager_max);
            let searchEngine = new Item("SearchEngine", formData.SearchEngine_min, formData.SearchEngine_max);
            let numOfDays = formData.DaysNumber
            var startTime = performance.now()
             var lists = await startGenerateToFile(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine, formData.NumOfAdd)//, formData.NumOfDelete, formData.NumOfEdgeAdded,formData.NumOfEdgeDeleted)

            var endTime = performance.now()
            var time=endTime - startTime
            alert('The generating took '+ time+' milliseconds')
             nodesList = lists[0];
            relationsList=lists[1];
        } else if (formData.type == 'Logicly') {

            let numOfKeeper4Component = Math.round(formData.NumOfKeeper);
            let keeper = new Item("Keeper", numOfKeeper4Component);
            let numOfMarketplace4Keeper = Math.round(formData.NumOfMarketplace / formData.NumOfKeeper);
            let marketPlace = new Item("Marketplace", numOfMarketplace4Keeper);

            let exeManager = new Item("ExecutionManager", Math.round(formData.NumOfExecutionManager / formData.NumOfMarketplace));
            let nodeExecutor = new Item('NodeExecutor', Math.round(formData.NumOfNodeExecutor / formData.NumOfMarketplace));
            let assetManager = new Item('AssetManager', Math.round(formData.NumOfAssetManager / formData.NumOfMarketplace));
            let searchEngine = new Item("SearchEngine", Math.round(formData.NumOfSearchEngine / formData.NumOfKeeper));
            let numOfDays = formData.DaysNumber
            var startTime = performance.now()
            var lists = await startGenerateToFile(numOfDays, keeper, marketPlace, exeManager, nodeExecutor, assetManager, searchEngine, formData.NumOfAdd)//, formData.NumOfDelete, formData.NumOfEdit)

            var endTime = performance.now()
            var time=endTime - startTime
            alert('The generating took '+ time+' milliseconds')
            console.log(lists)
            nodesList = lists[0];
            relationsList=lists[1];
        } else if (formData.type == 'fromFile') {

        }
        setTimeout(() => {
            setGeneratingState(2);
            setFormData({reset: true})
            setErrorMessages({name: "name", message: "test error message"});
        }, 1000)
    }

    return (
        <div className="wrapper">
            <h1>This is the Generate</h1>
            {generatingState == 1 && <div>Generating ...</div>}
            {generatingState == 2 && <div>Generating Done</div>}
            {generatingState == 3 && <div>Cleaning Done</div>}

            <div>
                <fieldset>
                    <div>
                        <label>Select Type: </label>
                        <select name="type" onChange={handleChange} value={formData.type || ''}>
                            <option value=""></option>
                            <option value="Random">Random</option>
                            <option value="Ranges">Ranges</option>
                            <option value="Logicly">Logicly</option>
                            <option value="fromFile">From File</option>
                        </select>
                    </div>
                </fieldset>
                {formData.type == 'Ranges' && <fieldset disabled={false}>
                    <div className="input-container">
                        <label>For the first day add: </label>
                    </div>
                    <div className="input-container">
                        <label>Keepers: </label>
                    </div>
                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="Keeper_min" onChange={handleChange} step="1"
                               value={formData.Keeper_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="Keeper_max" onChange={handleChange} step="1"
                               value={formData.Keeper_max || ''}/>
                    </div>
                    <div className="input-container">
                        <label>For each Keeper, the range of added SearchEngines: </label>
                    </div>

                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="SearchEngine_min" onChange={handleChange} step="1"
                               value={formData.SearchEngine_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="SearchEngine_max" onChange={handleChange} step="1"
                               value={formData.SearchEngine_max || ''}/>
                    </div>
                    <div className="input-container">
                        <label>For each Keeper, the range of added Marketplaces: </label>
                    </div>

                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="Marketplace_min" onChange={handleChange} step="1"
                               value={formData.Marketplace_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="Marketplace_max" onChange={handleChange} step="1"
                               value={formData.Marketplace_max || ''}/>
                    </div>

                    <div className="input-container">
                        <label>For each Marketplace, the range of added ExecutionManagers: </label>
                    </div>

                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="ExecutionManager_min" onChange={handleChange} step="1"
                               value={formData.ExecutionManager_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="ExecutionManager_max" onChange={handleChange} step="1"
                               value={formData.ExecutionManager_max || ''}/>
                    </div>

                    <div className="input-container">
                        <label>For each Marketplace, the range of added NodeExecutors: </label>
                    </div>

                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="NodeExecutor_min" onChange={handleChange} step="1"
                               value={formData.NodeExecutor_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="NodeExecutor_max" onChange={handleChange} step="1"
                               value={formData.NodeExecutor_max || ''}/>
                    </div>

                    <div className="input-container">
                        <label>For each Marketplace, the range of added AssetManagers: </label>
                    </div>

                    <div className="input-container">
                        <label>Min: </label>
                        <input type="number" name="AssetManager_min" onChange={handleChange} step="1"
                               value={formData.AssetManager_min || ''}/>
                        <label>Max: </label>
                        <input type="number" name="AssetManager_max" onChange={handleChange} step="1"
                               value={formData.AssetManager_max || ''}/>
                    </div>



                    <div className="input-container">
                        <label>The number of the next days: </label>
                    </div>

                    <div className="input-container">
                        <input type="number" name="DaysNumber" onChange={handleChange} step="1"
                               value={formData.DaysNumber || ''}/>
                    </div>
                    <div><label>For each day </label></div>
                    <div className="input-container">
                        <div>
                        <label>Added nodes: </label>
                        <input type="number" name="NumOfAdd" onChange={handleChange} step="1"
                               value={formData.NumOfAdd || ''}/>
                        <label>Deleted nodes: </label>
                        <input type="number" name="NumOfDelete" onChange={handleChange} step="1"
                               value={formData.NumOfDelete || ''}/>
                        </div>
                        {/*<div>*/}
                        {/*<label>Added edges: </label>*/}
                        {/*<input type="number" name="NumOfEdgeAdd" onChange={handleChange} step="1"*/}
                        {/*       value={formData.NumOfEdgeAdd || ''}/>*/}
                        {/*<label>Deleted edges: </label>*/}
                        {/*<input type="number" name="NumOfEdgeDelete" onChange={handleChange} step="1"*/}
                        {/*       value={formData.NumOfEdgeDelete || ''}/>*/}
                        {/*</div>*/}
                    </div>
                </fieldset>}
                {formData.type == 'Logicly' && <fieldset disabled={false}>

                    <div className="input-container">
                        <label>Keepers: </label>
                        <input type="number" name="NumOfKeeper" onChange={handleChange} step="1"
                               value={formData.NumOfKeeper || ''}/>
                    </div>

                    <div className="input-container">
                        <label>SearchEngines for all Keepers: </label><div>
                        <input type="number" name="NumOfSearchEngine" onChange={handleChange} step="1"
                               value={formData.NumOfSearchEngine || ''}/>
                        <label>For each keeper ({(formData.NumOfSearchEngine/formData.NumOfKeeper )}) SearchEngines</label>
                    </div>
                    </div>

                    <div className="input-container">
                        <label>Marketplaces for all Keepers: </label>
                        <div><input type="number" name="NumOfMarketplace" onChange={handleChange} step="1"
                               value={formData.NumOfMarketplace || ''}/>
                            <label>For each keeper ({(formData.NumOfMarketplace/formData.NumOfKeeper )}) Marketplaces</label>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>ExecutionManagers for all Marketplaces: </label>
                        <div>
                        <input type="number" name="NumOfExecutionManager" onChange={handleChange} step="1"
                               value={formData.NumOfExecutionManager || ''}/>
                            <label>For each Marketplace ({(formData.NumOfExecutionManager/formData.NumOfMarketplace )}) ExecutionManagers</label>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>NodeExecutors for all ExecutionManagers: </label>
                        <div>
                        <input type="number" name="NumOfNodeExecutor" onChange={handleChange} step="1"
                               value={formData.NumOfNodeExecutor || ''}/>
                            <label>For each Marketplace ({(formData.NumOfNodeExecutor/formData.NumOfMarketplace )}) NodeExecutors</label>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>AssetManagers for all NodeExecutors: </label>
                        <div>
                        <input type="number" name="NumOfAssetManager" onChange={handleChange} step="1"
                               value={formData.NumOfAssetManager || ''}/>
                            <label>For each Marketplace ({(formData.NumOfAssetManager/formData.NumOfMarketplace )}) AssetManagers</label>
                        </div>
                    </div>


                    <div className="input-container">
                        <label>The number of the next days: </label>
                    </div>

                    <div className="input-container">
                        <input type="number" name="DaysNumber" onChange={handleChange} step="1"
                               value={formData.DaysNumber || ''}/>
                    </div>
                    <div><label>For each day </label></div>
                    <div className="input-container">
                        <div>
                            <label>Added nodes: </label>
                            <input type="number" name="NumOfAdd" onChange={handleChange} step="1"
                                   value={formData.NumOfAdd || ''}/>
                            <label>Deleted nodes: </label>
                            <input type="number" name="NumOfDelete" onChange={handleChange} step="1"
                                   value={formData.NumOfDelete || ''}/>
                        </div>
                        {/*<div>*/}
                        {/*    <label>Added edges: </label>*/}
                        {/*    <input type="number" name="NumOfEdgeAdd" onChange={handleChange} step="1"*/}
                        {/*           value={formData.NumOfEdgeAdd || ''}/>*/}
                        {/*    <label>Deleted edges: </label>*/}
                        {/*    <input type="number" name="NumOfEdgeDelete" onChange={handleChange} step="1"*/}
                        {/*           value={formData.NumOfEdgeDelete || ''}/>*/}
                        {/*</div>*/}
                    </div>

                </fieldset>}
                {formData.type == 'fromFile' && <fieldset disabled={false}>
                    <label>Nodes URL: </label>
                    <input type="text" onChange={handleChange} name="nodeFile" />
                    <label>Relations URL: </label>
                    <input type="text" onChange={handleChange} name="relFile" />
                    <div>
                        <button onClick={handleSubmission}>Submit</button>
                    </div>

                </fieldset>

                }
                <button type="button" onClick={doGenerate} disabled={generatingState == 1}>Generate to database</button>
                <button type="button" onClick={doGenerateToFile} disabled={generatingState ==1}>Generate to csv</button>
                <button type="button" onClick={doClean} >Clean DataBase</button>


            </div>
            <div className="App">
                <div>
                {nodesList && <CSVLink
                    data={nodesList}

                >
                    Download nodes file
                </CSVLink>}
            </div><div>
                {relationsList && <CSVLink
                    data={relationsList}

                >
                    Download relations file
                </CSVLink>}
        </div>
            </div>
        </div>
    );
}

export default Generate;