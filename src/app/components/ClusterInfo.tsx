import React from 'react';

const colorDiv = "w-4 h-4 inline-block rounded"

export interface ClusterInfoProps {
    [key: string]: string | number; // Define the structure of the object
}

const ClusterInfo = (props: ClusterInfoProps) => {

    return (
        <div className="text-center">
            {Object.keys(props).map(key => (
                <div key={key}>
                    <strong>{key}:</strong>
                    {" "}
                    {key === "color" ? (
                        <div className={colorDiv} style={{ backgroundColor: props[key] as string }}></div>
                    ) : (
                        props[key]
                    )}
                </div>
            ))}
        </div>
    );
};

export default ClusterInfo;