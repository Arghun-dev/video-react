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

# Customize

## Enable & Disable Default Components

```js
import React from 'react';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';

export default props => {
  return (
    <Player poster="/assets/poster.png">
      <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
      <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" />

      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
  );
};
```

## Customize Video Source

This is an example on how to customize a `HLS video source`.


**HLSSource Component**

```js
import React, { Component } from 'react';
import Hls from 'hls.js';

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }
}
```

**Customize Source Example**

```js
import React from 'react';
import { Player } from 'video-react';
import HLSSource from './HLSSource';

export default props => {
  // Add customized HLSSource component into video-react Player
  // The Component with `isVideoChild` attribute will be added into `Video` component
  // Please use this url if you test it from local:
  // http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8
  return (
    <Player>
      <HLSSource
        isVideoChild
        src="//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
      />
    </Player>
  );
};
```
