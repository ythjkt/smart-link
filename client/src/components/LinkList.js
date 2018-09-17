import React from 'react';
import LinkListItem from './LinkListItem';

const LinkList = (props) => {
  const { links, onDelete } = props;
  const LinkLists = links.map((link, i) => {
    return (<LinkListItem
      link={link}
      onDelete={onDelete}
      key={i}
    />);
  })

  return (
    <ul>
      {LinkLists}
    </ul>
  );
}

export default LinkList;