import React from 'react';

const ClusterInfo = (obj: { [key: string]: any }) => {

    return (
        <div className="bg-gray-300 text-center">
            {Object.keys(obj).map(key => (
                <div key={key}>
                    <strong>{key}:</strong> {obj[key]}
                </div>
            ))}
        </div>
    );
};

export default ClusterInfo;