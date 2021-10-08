'use strict';

//import react and reactDom for browser rendering
import React from 'react';
import ReactDom from 'react-dom';

import Moment from 'moment';

//import the react-json-view component (installed with npm)
import JsonViewer from './../../src/js/index';

//render 2 different examples of the react-json-view component
ReactDom.render(
    <div>
        <JsonViewer
            src={getExampleJsonPl()}
            plBuildUrlCb={(name, hash, shard) => {
                return <a href='toto' target='__blank'>plop</a>;
            }}
        />

        <br />
        {/* just pass in your JSON to the src attribute */}
        <JsonViewer
            sortKeys
            style={{ padding: '30px', backgroundColor: 'white' }}
            src={getExampleJson1()}
            quotesOnKeys={false}
            collapseStringsAfterLength={12}
            onEdit={e => {
                console.log('edit callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onDelete={e => {
                console.log('delete callback', e);
            }}
            onAdd={e => {
                console.log('add callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onSelect={e => {
                console.log('select callback', e);
                console.log(e.namespace);
            }}
            displayObjectSize={true}
            name={'dev-server'}
            enableClipboard={copy => {
                console.log('you copied to clipboard!', copy);
            }}
            shouldCollapse={({ src, namespace, type }) => {
                if (type === 'array' && src.indexOf('test') > -1) {
                    return true;
                } else if (namespace.indexOf('moment') > -1) {
                    return true;
                }
                return false;
            }}
            defaultValue=""
        />

        <br />

        {/* use a base16 theme */}
        <JsonViewer
            src={getExampleJson1()}
            theme="railscasts"
            validationMessage="You're doing something wrong."
            collapseStringsAfterLength={15}
            onEdit={e => {
                console.log(e);
                if (e.new_value === 'error') {
                    return false;
                }
            }}
            onDelete={e => {
                console.log(e);
            }}
            onAdd={e => {
                console.log(e);
                if (e.new_value === 'error') {
                    return false;
                }
            }}
            name={false}
            iconStyle="triangle"
            shouldCollapse={({ src, type }) =>
                type === 'object' &&
                src.constructor &&
                src.constructor.name === 'Moment'
            }
        />

        <br />

        {/* initialize this one with a name and default collapsed */}
        <JsonViewer
            src={getExampleJson2()}
            collapsed={true}
            name={'feature_set'}
            displayDataTypes={false}
            indentWidth={2}
        />

        <br />

        {/* initialize this one with a name and default collapsed */}
        <JsonViewer
            src={getExampleJson2()}
            collapsed={1}
            name={'feature_set'}
            displayDataTypes={false}
            indentWidth={5}
        />

        <br />

        {/* initialize an example with a long string */}
        <JsonViewer
            src={getExampleJson3()}
            collapsed={true}
            name={'collapsed_by_default_example'}
            indentWidth={8}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
        />

        <br />

        {/*demo array support*/}
        <JsonViewer
            src={getExampleArray()}
            theme="solarized"
            onEdit={edit => {
                console.log(edit);
            }}
        />

        <br />

        {/* custom theme example */}
        <JsonViewer
            enableClipboard={false}
            src={getExampleJson1()}
            shouldCollapse={({ src, namespace, type }) =>
                namespace.indexOf('moment') > -1
            }
            theme={{
                base00: 'white',
                base01: '#ddd',
                base02: '#ddd',
                base03: '#444',
                base04: 'purple',
                base05: '#444',
                base06: '#444',
                base07: '#444',
                base08: '#444',
                base09: 'rgba(70, 70, 230, 1)',
                base0A: 'rgba(70, 70, 230, 1)',
                base0B: 'rgba(70, 70, 230, 1)',
                base0C: 'rgba(70, 70, 230, 1)',
                base0D: 'rgba(70, 70, 230, 1)',
                base0E: 'rgba(70, 70, 230, 1)',
                base0F: 'rgba(70, 70, 230, 1)'
            }}
        />

        <JsonViewer
            theme="hopscotch"
            collapsed={false}
            name="large_array"
            groupArraysAfterLength={50}
            src={getExampleJson4()}
        />
    </div>,
    document.getElementById('app-container')
);

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/


// Our example with data-factory url
function getExampleJsonPl() {
    return {
        "subWorkflowId": "1a394017-220d-4419-a350-631a267dbbaa",
        "file": {
            "url": "https://app.dev.product-live.com/data-factory/5f4627d58ff61cad6dc6d9ca/download/85161d9766cb3c41cccb38f3c2e7fdcd8b748bb35cda2c5b9f8c3d9538dbfa28/input-last.csv",
            "hash": "85161d9766cb3c41cccb38f3c2e7fdcd8b748bb35cda2c5b9f8c3d9538dbfa28",
            "filename": "input-last.csv"
        },
        "allFilesRecovered": "YES",
        "files": [
            {
                "url": "https://app.dev.product-live.com/data-factory/5f4627d58ff61cad6dc6d9ca/download/85161d9766cb3c41cccb38f3c2e7fdcd8b748bb35cda2c5b9f8c3d9538dbfa28/input-last.csv",
                "hash": "85161d9766cb3c41cccb38f3c2e7fdcd8b748bb35cda2c5b9f8c3d9538dbfa28",
                "filename": "input-last.csv"
            }
        ],
        "listing": {
            "url": "https://app.dev.product-live.com/data-factory/5f4627d58ff61cad6dc6d9ca/download/590da6c84aec6ea82e8ba4772809f04a58e441352f04bfb809ed1fda34faae8b/listing-2021-10-08-13-00-01.xml",
            "hash": "590da6c84aec6ea82e8ba4772809f04a58e441352f04bfb809ed1fda34faae8b",
            "filename": "listing-2021-10-08-13-00-01.xml"
        },
        "noFile": "NO"
    };
}

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        string: 'this is a test string',
        integer: 42,
        empty_array: [],
        empty_object: {},
        array: [1, 2, 3, 'test'],
        float: -2.757,
        undefined_var: undefined,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            isString: value => {
                if (typeof value === 'string') {
                    return 'string';
                } else {
                    return 'other';
                }
            }
        },
        string_number: '1234',
        date: new Date(),
        moment: Moment(),
        regexp: /[0-9]/gi
    };
}

//and another a function to get an example JSON object
function getExampleJson2() {
    return {
        normalized: {
            '1-grams': {
                body: 1,
                testing: 1
            },
            '2-grams': {
                'testing body': 1
            },
            '3-grams': {}
        },
        noun_phrases: {
            body: 1
        },
        lemmatized: {
            '1-grams': {
                test: 1,
                body: 1
            },
            '2-grams': {
                'test body': 1
            },
            '3-grams': {}
        },
        dependency: {
            '1-grams': {
                testingVERBROOTtestingVERB: 1,
                bodyNOUNdobjtestingVERB: 1
            },
            '2-grams': {
                'testingVERBROOTtestingVERB bodyNOUNdobjtestingVERB': 1
            },
            '3-grams': {}
        }
    };
}

function getExampleJson3() {
    return {
        example_information:
            'this example has the collapsed prop set to true and the indentWidth prop is set to 8',
        default_collapsed: true,
        collapsed_array: [
            'you expanded me',
            'try collapsing and expanding the root node',
            'i will still be expanded',
            {
                leaf_node: true
            }
        ]
    };
}

function getExampleJson4() {
    const large_array = new Array(225).fill(
        'this is a large array full of items'
    );

    large_array.push(getExampleArray());

    large_array.push(new Array(75).fill(Math.random()));

    return large_array;
}

function getExampleArray() {
    return [
        'you can also display arrays!',
        new Date(),
        1,
        2,
        3,
        {
            pretty_cool: true
        }
    ];
}
