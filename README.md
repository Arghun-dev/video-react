# video-react

**video-react** is one of the best video streaming components has been built for `react`.

**first implementation with download button**

`DownloadButton.jsx`

```js
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

export default class DownloadButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}

  render() {
    const { player, className } = this.props;
    const { currentSrc } = player;

    return (
      <a
        ref={c => {
          this.button = c;
        }}
        className={classNames(className, {
          'video-react-control': true,
          'video-react-button': true
        })}
        href={currentSrc}
        download
        style={{
          backgroundImage:
            'url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDloLTRWM0g5djZINWw3IDcgNy03ek01IDE4djJoMTR2LTJINXoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        tabIndex="0"
        onClick={this.handleClick}
      />
    );
  }
}

DownloadButton.propTypes = propTypes;
```

`Video.jsx`

```js
import { Player, ControlBar } from 'video-react';
import DownloadButton from './DownloadButton';

export default function Video() {
  return (
    <Player src="http://media.w3.org/2010/05/bunny/movie.mp4" autoPlay>
      <ControlBar autoHide={false}>
        <DownloadButton order={7} />
      </ControlBar>
    </Player>
  );
};
```
