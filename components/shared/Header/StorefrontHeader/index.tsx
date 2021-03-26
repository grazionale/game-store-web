import React, { useState } from 'react'
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faShoppingCart,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import ProductSearchService from '../../../../util/ProductSearchService';
import { useRouter } from 'next/router';

import Logo from '../../Logo'
import styles from './styles.module.css';
import Link from 'next/link'

const StorefrontHeader: React.FC = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const handleSearch = (): void => {
    router.push(`
      /Search${ProductSearchService.execute({ search })}
    `);
  }

  return (
    <Row className={styles.background}>
      <Col md={6} className="mt-2">
        <Logo />
      </Col>

      <Col md={6} className="mt-2 text-center">
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <InputGroup className={`${router.pathname === '/Search' ? styles.hidden : ''}`}>
              <FormControl
                placeholder="Pesquisar produto"
                value={search}
                onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(evt.target.value)
                }

                onKeyUp={
                  (evt: React.KeyboardEvent<HTMLInputElement>) => {
                    if (evt.key.toLowerCase() === 'enter') {
                      handleSearch();
                    }
                  }
                }
              />
            </InputGroup>
          </Col>

          <Col md={6}>
            <Row>
              <Col
                className={`${router.pathname === '/Search' ? styles.hidden : ''}`}>
                <FontAwesomeIcon
                  icon={faSearch}
                  color="var(--color-gray-light)"
                  onClick={handleSearch}
                />
              </Col>

              <Col md={4} xs={4}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  color="var(--color-gray-light)"
                />
              </Col>

              <Col md={4} xs={4}>
                <Link href="/Auth/Login">
                  <a>
                    <FontAwesomeIcon icon={faUserCircle} color="var(--color-gray-light)" />
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StorefrontHeader
