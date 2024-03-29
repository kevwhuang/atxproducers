import React from 'react';

import useZustand from '../hooks/useZustand';

import '../styles/modules/Filter.scss';

function Filter(): React.ReactElement {
    const [selectedSome, setSelectedSome] = React.useState(false);
    const [filter, updateFilter] = useZustand(s => [s.filter, s.updateFilter]);
    const [sort, updateSort] = useZustand(s => [s.sort, s.updateSort]);

    function Tag({ group, label, tag }: TagProps): React.ReactElement {
        const className = filter[group as keyof typeof filter][tag]
            ? `active filter__group--${group}` : `filter__group--${group}`;
        return (
            <button
                className={className}
                data-tag={tag}
                onClick={handleToggle}
            >
                {label}
            </button>
        );
    }

    function checkselectedSome(): boolean {
        for (const group in filter) {
            for (const tag in filter[group as keyof typeof filter]) {
                if (filter[group as keyof typeof filter][tag]) return true;
            }
        }
        return false;
    }

    function handleAll(): void {
        for (const group in filter) {
            for (const tag in filter[group as keyof typeof filter]) {
                filter[group as keyof typeof filter][tag] = false;
            }
        }
        setSelectedSome(false);
        updateFilter(JSON.parse(JSON.stringify(filter)));
    }

    function handleSort(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        const key = e.target.innerText.split(' ')[2]!.toLowerCase() as keyof typeof sort;
        sort[key] = !sort[key];
        sort.prev = key === 'alias';
        updateSort(JSON.parse(JSON.stringify(sort)));
    }

    function handleToggle(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        const group = e.target.className.slice(e.target.className.indexOf('--') + 2);
        const tag = e.target.getAttribute('data-tag') as string;
        const cur = filter[group as keyof typeof filter][tag];
        filter[group as keyof typeof filter][tag] = !cur;
        setSelectedSome(checkselectedSome());
        updateFilter(JSON.parse(JSON.stringify(filter)));
    }

    React.useEffect(() => setSelectedSome(checkselectedSome()), []);

    return (
        <section className="filter">
            <div className="filter__group">
                <p>Services</p>
                <Tag group="services" tag="production" label="Production" />
                <Tag group="services" tag="beatmaking" label="Beatmaking" />
                <Tag group="services" tag="songwriting" label="Songwriting" />
                <Tag group="services" tag="singing" label="Singing" />
                <Tag group="services" tag="musician" label="Musician" />
                <Tag group="services" tag="recording" label="Recording" />
                <Tag group="services" tag="mixing" label="Mixing" />
                <Tag group="services" tag="mastering" label="Mastering" />
                <Tag group="services" tag="post" label="Post Production" />
                <Tag group="services" tag="synthesis" label="Synthesis" />
                <Tag group="services" tag="editing" label="Audio Editing" />
                <Tag group="services" tag="live" label="Live Sound" />
            </div>
            <div className="filter__group">
                <p>Genres</p>
                <Tag group="genres" tag="electronic" label="Electronic" />
                <Tag group="genres" tag="dance" label="Dance" />
                <Tag group="genres" tag="hiphop" label="Hip Hop" />
                <Tag group="genres" tag="rnb" label="R&B" />
                <Tag group="genres" tag="pop" label="Pop" />
                <Tag group="genres" tag="indie" label="Indie" />
                <Tag group="genres" tag="rock" label="Rock" />
                <Tag group="genres" tag="acoustic" label="Acoustic" />
            </div>
            <div className="filter__group">
                <p>Instruments</p>
                <Tag group="instruments" tag="hardware" label="Hardware" />
                <Tag group="instruments" tag="vocals" label="Vocals" />
                <Tag group="instruments" tag="guitar" label="Guitar" />
                <Tag group="instruments" tag="keys" label="Keys" />
                <Tag group="instruments" tag="percussions" label="Percussions" />
                <Tag group="instruments" tag="strings" label="Strings" />
                <Tag group="instruments" tag="brass" label="Brass" />
            </div>
            <div className="filter__group">
                <p>Workstations</p>
                <Tag group="workstations" tag="ableton" label="Ableton" />
                <Tag group="workstations" tag="fl" label="FL Studio" />
                <Tag group="workstations" tag="logic" label="Logic" />
                <Tag group="workstations" tag="reaper" label="Reaper" />
                <Tag group="workstations" tag="reason" label="Reason" />
                <Tag group="workstations" tag="protools" label="Pro Tools" />
            </div>
            <div className="filter__actions">
                <button onClick={handleSort}>Sort by Alias</button>
                <button onClick={handleSort}>Sort by Name</button>
                <button onClick={handleAll} disabled={!selectedSome}>Clear</button>
            </div>
        </section>
    );
}

export default Filter;
