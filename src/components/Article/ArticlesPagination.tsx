import React from 'react'
import s from 'styled-components'
import { M2 } from '../../constants/measurements'
import { Link } from 'gatsby'
import { ARTICLES_PAGE_ROUTE } from '../../constants/routes'
import { GRAY_4 } from '../../constants/colors'
import { P, HR, Flex, DisabledSpan } from '../../shared'

const ArticlesPaginationWrapper = s.div<{}>`
  text-align: center;
  margin-bottom: ${M2};
`

const PageNumbersWrapper = s(P)`
  flex: 1;
  user-select: none;

  a {
    margin: 0 1.25%;
  }
`

const Dots = (): React.ReactElement => (
  <span
    style={{
      color: GRAY_4,
    }}
  >
    {'...'}
  </span>
)

const ArticlesPageLink = ({
  page,
  numPages,
  text,
}: {
  page: number
  text?: string
  numPages?: number
}): React.ReactElement => {
  if (page <= 0 || (numPages && page > numPages)) {
    return <React.Fragment />
  }
  return <Link to={ARTICLES_PAGE_ROUTE(page)}>{text || page}</Link>
}

export const ArticlesPagination = ({
  numPages,
  currentPage,
}: {
  numPages: number
  currentPage: number
}): React.ReactElement => (
  <ArticlesPaginationWrapper>
    <HR />
    <Flex style={{ width: '100%' }}>
      <P style={{ width: 'auto ' }} lighter>
        {currentPage === 1 ? <DisabledSpan>Prev</DisabledSpan> : null}
        <ArticlesPageLink
          page={currentPage - 1}
          numPages={numPages}
          text="Prev"
        />
      </P>
      <PageNumbersWrapper center lighter>
        {currentPage - 1 > 1 ? (
          <>
            <ArticlesPageLink page={1} />
            <Dots />
          </>
        ) : null}
        <ArticlesPageLink page={currentPage - 1} numPages={numPages} />
        {currentPage}
        <ArticlesPageLink page={currentPage + 1} numPages={numPages} />
        {currentPage + 1 < numPages ? (
          <>
            <Dots />
            <ArticlesPageLink page={numPages} />
          </>
        ) : null}
      </PageNumbersWrapper>
      <P style={{ width: 'auto' }} lighter>
        {currentPage === numPages ? <DisabledSpan>Next</DisabledSpan> : null}
        <ArticlesPageLink
          page={currentPage + 1}
          numPages={numPages}
          text="Next"
        />
      </P>
    </Flex>
  </ArticlesPaginationWrapper>
)
