// Tried simply setting alwaysExpanded on the original but had a bizarre error
// where `colors` import was undefined.
// Same as original but removes the expansion crap.
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { IconOutlink } from '@apollo/space-kit/icons/IconOutlink';
import { Link, withPrefix } from 'gatsby';
import { size } from 'polished';
import { colors } from 'gatsby-theme-apollo-core/src/utils/colors';
import { smallCaps } from 'gatsby-theme-apollo-core/src/utils/typography';

const StyledList = styled.ul({
  marginLeft: 0,
  marginBottom: 32,
  listStyle: 'none'
});

const StyledListItem = styled.li({
  fontSize: '1rem',
  lineHeight: 1.5,
  marginBottom: '0.8125rem',
  a: {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      opacity: colors.hoverOpacity
    },
    '&.active': {
      color: colors.primary,
      pointerEvents: 'none'
    }
  }
});

const Category = styled.div({
  position: 'relative',
  zIndex: 0,
  [StyledList]: {
    position: 'relative',
    zIndex: 2
  }
});

const CategoryTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  color: colors.text1,
  fontWeight: 'bold',
  fontSize: 14,
  lineHeight: '15px',
  ...smallCaps,
  svg: size(10),
  '&.active': {
    color: colors.primary
  }
});

const StyledOutlinkIcon = styled(IconOutlink)(size(14), {
  verticalAlign: -1,
  marginLeft: 8,
  color: colors.text3
});

function isPageSelected(path, pathname) {
  const [a, b] = [withPrefix(path), pathname].map(string =>
    string.replace(/\/$/, '')
  );
  return a === b;
}

function NavItems(props) {
  return (
    <StyledList>
      {props.pages.map((page, index) => {
        const pageTitle = page.sidebarTitle || page.title;
        return (
          <StyledListItem key={index}>
            {page.anchor ? (
              <a href={page.path} target="_blank" rel="noopener noreferrer">
                {pageTitle}
                <StyledOutlinkIcon />
              </a>
            ) : (
                <Link
                  className={
                    isPageSelected(page.path, props.pathname) ? 'active' : null
                  }
                  to={page.path}
                  title={page.description}
                  onClick={props.onLinkClick}
                >
                  {pageTitle}
                </Link>
              )}
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

NavItems.propTypes = {
  pages: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func
};

export default function SidebarNav(props) {
  const categoriesRef = useRef();

  const categories = props.contents.filter(content => content.title);
  const [root] = props.contents.filter(content => !content.title);

  return (
    <>
      {root && (
        <NavItems
          pages={root.pages}
          pathname={props.pathname}
          onLinkClick={props.onLinkClick}
        />
      )}
      <div ref={categoriesRef}>
        {categories.map((category, index) => {
          const isSelected = category.pages.some(page =>
            isPageSelected(page.path, props.pathname)
          );
          const className = isSelected ? 'active' : null;
          return (
            <Category key={index}>
              <CategoryTitle className={className}>
                {category.title}
              </CategoryTitle>
              <NavItems
                pages={category.pages}
                pathname={props.pathname}
                onLinkClick={props.onLinkClick}
              />
            </Category>
          );
        })}
      </div>
    </>
  );
}

SidebarNav.propTypes = {
  contents: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  onToggleAll: PropTypes.func,
  onToggleCategory: PropTypes.func,
  onLinkClick: PropTypes.func
};
