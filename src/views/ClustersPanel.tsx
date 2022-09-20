import React, {FC, useEffect, useMemo, useState} from "react";
import {useSigma} from "react-sigma-v2";
import {sortBy, values, keyBy, mapValues, toNumber} from "lodash";
import {MdGroupWork} from "react-icons/md";
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";
import RangeSlider from 'react-bootstrap-range-slider';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {Cluster, FiltersState} from "../types";
import Panel from "./Panel";
import {InitForm} from "../helpers/InitForm";

const ClustersPanel: FC<{
    clusters: Cluster[];
    filters: FiltersState;
    toggleCluster: (cluster: string) => void;
    setClusters: (clusters: Record<string, boolean>) => void;
    startTimeLine: ()=>void;
    stopTimeLine: ()=>void;

}> = ({clusters, filters, toggleCluster, setClusters,startTimeLine,stopTimeLine}) => {
    const sigma = useSigma();
    const graph = sigma.getGraph();

    const nodesPerCluster = useMemo(() => {
        const index: Record<string, number> = {};
        graph.forEachNode((_, {cluster}) => (index[cluster] = (index[cluster] || 0) + 1));
        return index;
    }, []);

    const maxNodesPerCluster = useMemo(() => Math.max(...values(nodesPerCluster)), [nodesPerCluster]);
    const visibleClustersCount = useMemo(() => Object.keys(filters.clusters).length, [filters]);

    const [visibleNodesPerCluster, setVisibleNodesPerCluster] = useState<Record<string, number>>(nodesPerCluster);

    useEffect(() => {
        // To ensure the graphology instance has up to data "hidden" values for
        // nodes, we wait for next frame before reindexing. This won't matter in the
        // UX, because of the visible nodes bar width transition.
        requestAnimationFrame(() => {
            const index: Record<string, number> = {};
            graph.forEachNode((_, {cluster, hidden}) => !hidden && (index[cluster] = (index[cluster] || 0) + 1));
            setVisibleNodesPerCluster(index);
        });
    }, [filters]);



    const sortedClusters = useMemo(
        () => sortBy(clusters, (cluster) => -nodesPerCluster[cluster.key]),
        [clusters, nodesPerCluster],
    );

    return (
        <Panel initiallyDeployed title={<span className="text-muted text-small">{"Control Panel"}</span>}>
                    <p >
                        <button className="btn"
                                onClick={() => setClusters(mapValues(keyBy(clusters, "key"), () => true))}>
                            <AiOutlineCheckCircle/> Check all
                        </button>
                        {" "}
                        <button className="btn" onClick={() => setClusters({})}>
                            <AiOutlineCloseCircle/> Uncheck all
                        </button>
                        {" "}
                        {/*<button className="btn" onClick={() => startTimeLine()}>*/}
                        {/*   Next day*/}
                        {/*</button>*/}
                    </p>
                    <ul>
                        {sortedClusters.map((cluster) => {
                            const nodesCount = nodesPerCluster[cluster.key];
                            const visibleNodesCount = visibleNodesPerCluster[cluster.key] || 0;
                            return (
                                <li
                                    className="caption-row"
                                    key={cluster.key}
                                    title={`${nodesCount} page${nodesCount > 1 ? "s" : ""}${
                                        visibleNodesCount !== nodesCount ? ` (only ${visibleNodesCount} visible)` : ""
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.clusters[cluster.key] || false}
                                        onChange={() => toggleCluster(cluster.key)}
                                        id={`cluster-${cluster.key}`}
                                    />
                                    <label htmlFor={`cluster-${cluster.key}`}>
                                <span className="circle"
                                      style={{background: cluster.color, borderColor: cluster.color}}/>{" "}
                                        <div className="node-label">
                                            <span>{cluster.clusterLabel}</span>
                                            <div className="bar"
                                                 style={{width: (100 * nodesCount) / maxNodesPerCluster + "%"}}>
                                                <div
                                                    className="inside-bar"
                                                    style={{
                                                        width: (100 * visibleNodesCount) / nodesCount + "%",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            );
                        })}
                        <li className="caption-row">
                            <input
                                type="checkbox"
                                checked={ true}
                                                            />
                            <label >
                                <span className="circle"
                                      style={{background: 'red', borderColor: 'red'}}/>{" "}
                                <div className="node-label">
                                    <span>Invalid</span>

                                </div>
                                <span className="circle"
                                      style={{background: 'black', borderColor: 'black'}}/>{" "}
                                <div className="node-label">
                                    <span>Removed</span>

                                </div>
                            </label>
                        </li>
                    </ul>

        </Panel>
    );
};

export default ClustersPanel;
