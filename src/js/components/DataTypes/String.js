import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: AttributeStore.get(
                props.rjvId,
                props.namespace,
                'collapsed',
                true
            )
        };
    }

    toggleCollapsed = () => {
        this.setState(
            {
                collapsed: !this.state.collapsed
            },
            () => {
                AttributeStore.set(
                    this.props.rjvId,
                    this.props.namespace,
                    'collapsed',
                    this.state.collapsed
                );
            }
        );
    };

    getPlLink = (value) => {
        if (!value.match(/(http.*data-factory\/.*\/download\/.*\/.*)/)) {
            return;
        }
        const plCb = AttributeStore.get(
            this.props.rjvId,
            'global',
            'plBuildUrlCb'
        );
        if (!plCb) {
            console.warn('pl url detected, add plBuildUrlCb to react-json-view to transform it. (name: string, hash: string; shard: string) => ReactNode');
            return;
        }
        const matches = /.*data-factory\/(.*)\/download\/(.*)\/(.*)/g.exec(value);
        let link = '';
        if (matches) {
            const shard = matches[1];
            const hash = matches[2];
            const name = matches[3];
            link = plCb(name, hash, shard);
        }
        return link;
    };

    render() {
        const type_name = 'string';
        const { collapsed } = this.state;
        const { props } = this;
        const { collapseStringsAfterLength, theme } = props;
        let { value } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { style: { cursor: 'default' } };

        const plLink = this.getPlLink(value);
        if (collapsible && value.length > collapseStringsAfterLength) {
            style.style.cursor = 'pointer';
            if (this.state.collapsed) {
                value = (
                    <span>
                        {value.substring(0, collapseStringsAfterLength)}
                        <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
                );
            }
        }

        return (
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    {...style}
                    onClick={this.toggleCollapsed}
                >
                    "{value}"
                </span>
                {plLink}
            </div>
        );
    }
}
