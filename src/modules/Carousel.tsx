import React from 'react';

import ImageGallery from 'react-image-gallery';

import type ReactImageGalleryItem from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/modules/Carousel.scss';

const items: ReactImageGalleryItem[] | any = [
    'lonely_child_1',
    'henyx_1',
    'henyx_2',
    'den_zuko_1',
    'den_zuko_2',
    'producer_bash_1',
    'producer_bash_2',
];

for (let i = 0; i < items.length; i++) {
    const base = 'https://res.cloudinary.com/atxproducers/image/upload';
    const transformation1 = '/q_auto/f_auto/e_improve:indoor:50';
    const transformation2 = '/q_auto/f_auto/ar_4:3,c_scale,h_500/e_improve:indoor:50';
    const transformation3 = '/q_auto/f_auto/ar_4:3,c_scale,w_100/e_improve:indoor:50';
    items[i] = {
        fullscreen: `${base}${transformation1}/gallery/${items[i]}.webp`,
        original: `${base}${transformation2}/gallery/${items[i]}.webp`,
        thumbnail: `${base}${transformation3}/gallery/${items[i]}.webp`,
    };
}

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
