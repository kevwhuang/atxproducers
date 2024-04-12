import React from 'react';

import ImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';

import gallery from '../assets/gallery.json';

import '../styles/modules/Carousel.scss';
import 'react-image-gallery/styles/css/image-gallery.css';

const items: ReactImageGalleryItem[] | any = gallery;

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
