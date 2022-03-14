import React from 'react';

export const AjaxLoader: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({ style, ...rest }) => {
  return (
    <figure className="ajax-loader">
      <img
        src={'/assets/images/Ajax_loader_metal_512.gif'}
        alt="ajax-loader"
        aria-hidden="true"
        style={style}
        {...rest} />
    </figure>
  );
};
