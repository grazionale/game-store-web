import MainComponent from '../components/shared/MainComponent';
import { Carousel } from 'react-bootstrap';
import styles from './styles.module.css';
import HighlightedProducts from '../components/Storefront/HighlightedProducts';
import HomeService from '../services/home';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import HomeIndexData from '../dtos/HomeIndexData';

interface StoreFrontProps {
  products: HomeIndexData;
}

const Storefront: React.FC<StoreFrontProps> = ({ products }) => {
  const router = useRouter();

  const { data, error } = useSWR(
    '/storefront/v1/home',
    HomeService.index, { initialData: products }
  );

  const { featured, last_releases, cheapest } = data;

  if (error) {
    toast.error('Erro ao obter dados da home!')
    console.log(error);
  }

  return (
    <MainComponent>
      <Carousel className={styles.carousel}>
        {
          featured?.slice(0, 3)?.map(
            product => (
              <Carousel.Item
                key={product.id}
                onClick={() => router.push(`/Product/${product.id}`)}
                className={styles.carousel_item}
              >
                <img
                  className={`d-block w-100 ${styles.carousel_image}`}
                  src={product.image_url}
                  alt={product.name}
                />
              </Carousel.Item>
            )
          )
        }
      </Carousel>

      <HighlightedProducts
        title="Ofertas da Semana"
        type="highlighted"
        products={cheapest}
        handleSeeMore={
          () => router.push({
            pathname: '/Search',
            query: {
              order: 'price',
              direction: 'asc'
            }
          })
        }
      />

      <HighlightedProducts
        title="Lançamentos"
        products={last_releases}
        handleSeeMore={
          () => router.push({
            pathname: '/Search',
            query: {
              order: 'release_date',
              direction: 'desc'
            }
          })
        }
      />

      <HighlightedProducts
        title="Mais Populares"
        products={featured}
        handleSeeMore={
          () => router.push({
            pathname: '/Search',
          })
        }
      />
    </MainComponent>
  )
}

export async function getStaticProps() {
  const products = await HomeService.index('/storefront/v1/home');
  return { props: { products } }
}

export default Storefront;
