import React from 'react';
import Icon from '@ant-design/icons';
import { List, Popover } from 'antd';
import CvatTooltip from 'components/common/cvat-tooltip';
import { Chapter } from 'cvat-core/src/frames';
import { ChapterMenuIcon } from 'icons';

interface Props {
    chapters: Chapter[];
    activeChapter: number | null;
    onSelectChapter: (id: number) => void;
    onHoveredChapter?: (id: number | null) => void;
}

function ChapterMenu(props: Props): JSX.Element {
    const {
        chapters,
        activeChapter,
        onSelectChapter,
        onHoveredChapter,
    } = props;

    const content = (
        <List
            size='small'
            dataSource={chapters}
            renderItem={(chapter: Chapter) => {
                const isActive = chapter.id === activeChapter;
                const itemClass = `chapter-item ${isActive ? 'active' : ''}`;

                return (
                    <List.Item
                        className={itemClass}
                        key={chapter.id}
                        onClick={() => onSelectChapter(chapter.id)}
                        onMouseEnter={() => onHoveredChapter?.(chapter.id)}
                        onMouseLeave={() => onHoveredChapter?.(null)}
                    >
                        <div>
                            <strong>{chapter.metadata.title}</strong>
                            <span style={{ color: '#aaa' }}>{chapter.id}</span>
                            <div>
                                Frame
                                {chapter.start}
                                 -
                                {chapter.stop}
                            </div>
                        </div>
                    </List.Item>

                );
            }}
        />
    );

    return (
        <Popover
            trigger='click'
            content={content}
            title='Chapters'
            placement='bottom'
        >

            <CvatTooltip title='Select chapter'>
                <Icon
                    className='cvat-player-chapters-menu-button'
                    component={ChapterMenuIcon}
                />
            </CvatTooltip>

        </Popover>
    );
}

export default React.memo(ChapterMenu);
