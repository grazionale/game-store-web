import MainComponent from '../components/shared/MainComponent';
import { Carousel } from 'react-bootstrap';
import styles from './styles.module.css';
import HighlightedProducts from '../components/Storefront/HighlightedProducts';
import HomeService from '../services/home';
import useSWR from 'swr';
import { toast } from 'react-toastify';

const Storefront: React.FC = () => {
  const { data, error } = useSWR('/storefront/v1/home', HomeService.index);
  const { featured, last_releases, cheapest } = { ...data };

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
              <Carousel.Item key={product.id}>
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
      />

      <HighlightedProducts
        title="Lançamentos"
        products={last_releases}
      />

      <HighlightedProducts
        title="Mais Populares"
        products={featured}
      />
    </MainComponent>
  )
}

export default Storefront;
