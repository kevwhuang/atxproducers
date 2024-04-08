import React from 'react';

import ImageGallery from 'react-image-gallery';

import lonely_child_2_fullscreen from '../assets/images/2023.08.14_lonely_child_2_fullscreen.webp';
import lonely_child_2_original from '../assets/images/2023.08.14_lonely_child_2_original.webp';
import lonely_child_2_thumbnail from '../assets/images/2023.08.14_lonely_child_2_thumbnail.webp';
import producer_bash_1_fullscreen from '../assets/images/2023.08.26_producer_bash_1_original.webp';
import producer_bash_1_original from '../assets/images/2023.08.26_producer_bash_1_original.webp';
import producer_bash_1_thumbnail from '../assets/images/2023.08.26_producer_bash_1_thumbnail.webp';
import producer_bash_2_fullscreen from '../assets/images/2023.08.26_producer_bash_2_fullscreen.webp';
import producer_bash_2_original from '../assets/images/2023.08.26_producer_bash_2_original.webp';
import producer_bash_2_thumbnail from '../assets/images/2023.08.26_producer_bash_2_thumbnail.webp';
import henyx_1_fullscreen from '../assets/images/2024.02.06_henyx_1_original.webp';
import henyx_1_original from '../assets/images/2024.02.06_henyx_1_original.webp';
import henyx_1_thumbnail from '../assets/images/2024.02.06_henyx_1_thumbnail.webp';
import henyx_2_fullscreen from '../assets/images/2024.02.06_henyx_2_fullscreen.webp';
import henyx_2_original from '../assets/images/2024.02.06_henyx_2_original.webp';
import henyx_2_thumbnail from '../assets/images/2024.02.06_henyx_2_thumbnail.webp';
import den_zuko_1_fullscreen from '../assets/images/2024.03.20_den_zuko_1_original.webp';
import den_zuko_1_original from '../assets/images/2024.03.20_den_zuko_1_original.webp';
import den_zuko_1_thumbnail from '../assets/images/2024.03.20_den_zuko_1_thumbnail.webp';
import den_zuko_2_fullscreen from '../assets/images/2024.03.20_den_zuko_2_fullscreen.webp';
import den_zuko_2_original from '../assets/images/2024.03.20_den_zuko_2_original.webp';
import den_zuko_2_thumbnail from '../assets/images/2024.03.20_den_zuko_2_thumbnail.webp';

import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/modules/Carousel.scss';

const items = [
    {
        fullscreen: lonely_child_2_fullscreen,
        original: lonely_child_2_original,
        thumbnail: lonely_child_2_thumbnail,
    }, {
        fullscreen: producer_bash_1_fullscreen,
        original: producer_bash_1_original,
        thumbnail: producer_bash_1_thumbnail,
    }, {
        fullscreen: producer_bash_2_fullscreen,
        original: producer_bash_2_original,
        thumbnail: producer_bash_2_thumbnail,
    }, {
        fullscreen: henyx_1_fullscreen,
        original: henyx_1_original,
        thumbnail: henyx_1_thumbnail,
    }, {
        fullscreen: henyx_2_fullscreen,
        original: henyx_2_original,
        thumbnail: henyx_2_thumbnail,
    }, {
        fullscreen: den_zuko_1_fullscreen,
        original: den_zuko_1_original,
        thumbnail: den_zuko_1_thumbnail,
    }, {
        fullscreen: den_zuko_2_fullscreen,
        original: den_zuko_2_original,
        thumbnail: den_zuko_2_thumbnail,
    },
];

function Carousel(): React.ReactElement {
    return (
        <section className="carousel">
            <ImageGallery
                additionalClass="carousel__gallery"
                items={items}
                showPlayButton={false}
                lazyLoad={true}
            />
        </section>
    );
}

export default Carousel;
