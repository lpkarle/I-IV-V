import React from 'react';

export default function NotFound({ lang }) {
    return (
        <div className="content">
            <h1>{lang.str.not_found}</h1>
        </div>
    );
}
