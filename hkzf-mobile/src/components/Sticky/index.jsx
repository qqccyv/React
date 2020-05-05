import React, { Component } from 'react';

import styles from './Sticky.module.scss'

export default class Sticky extends Component {
    scrollListener = null

    boxElement = null
    fixedElement = null

    componentDidMount() {
        const { height } = this.boxElement.getBoundingClientRect();
        this.boxElement.style = `height:${height}px`;
        window.addEventListener('scroll', this.scrollListener = e => {
            const { top } = this.boxElement.getBoundingClientRect();
            // top < 1 ? fixedElement.classList.add(styles.fixed) : fixedElement.classList.remove(styles.fixed);
            this.fixedElement.classList[top < 1 ? 'add' : 'remove'](styles.fixed);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener);
    }

    render() {
        return (
            <div ref={el => this.boxElement = el}>
                <div ref={el => this.fixedElement = el}>{this.props.children}</div>
            </div>
        )
    }
}