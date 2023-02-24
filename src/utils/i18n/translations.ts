interface Translation {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const translations: Translation = {
  es: {
    navbar: {
      buyByDepartment: 'Comprar por categoría',
      cart: 'Carrito',
    },
  },
  en: {
    navbar: {
      buyByDepartment: 'Shop by department',
      cart: 'Cart',
    },
  },
};

export default translations;
