import React from 'react';

const LinkListItem = ({ link, onDelete }) => {
  const { _id, smartLink, targetUrl, createdAt }  = link;
  return (
    <li>{_id} - <a href={'http://' + smartLink}>{smartLink}</a> - {targetUrl} - {createdAt}<button onClick={onDelete} id={_id}>Remove</button></li>
  );
};

export default LinkListItem;
