export interface Product {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  date: string;
  featured?: boolean;
  description?: string;
  seller?: {
    name: string;
    memberSince: string;
    phone?: string;
  };
}

export const categories = [
  { id: 'cars', name: 'Cars', icon: '🚗', count: 1250 },
  { id: 'bikes', name: 'Motorcycles', icon: '🏍️', count: 890 },
  { id: 'mobiles', name: 'Mobile Phones', icon: '📱', count: 2340 },
  { id: 'electronics', name: 'Electronics', icon: '💻', count: 1560 },
  { id: 'furniture', name: 'Furniture', icon: '🛋️', count: 780 },
  { id: 'fashion', name: 'Fashion', icon: '👕', count: 1890 },
  { id: 'books', name: 'Books', icon: '📚', count: 450 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 320 },
  { id: 'pets', name: 'Pets', icon: '🐕', count: 180 },
  { id: 'jobs', name: 'Jobs', icon: '💼', count: 560 },
  { id: 'services', name: 'Services', icon: '🔧', count: 340 },
  { id: 'property', name: 'Property', icon: '🏠', count: 670 },
];

export const products: Product[] = [
  // Cars
  { id: '1', title: 'Maruti Swift VXI 2020 - Single Owner', price: 550000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', category: 'cars', date: 'Today', featured: true },
  { id: '2', title: 'Honda City ZX 2019 - Low KM', price: 780000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400', category: 'cars', date: 'Today' },
  { id: '3', title: 'Hyundai i20 Sportz 2021', price: 720000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', category: 'cars', date: 'Yesterday' },
  { id: '4', title: 'Tata Nexon XZ Plus 2022', price: 980000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', category: 'cars', date: 'Yesterday' },
  { id: '5', title: 'Mahindra XUV300 W8 2021', price: 890000, location: 'Pune', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', category: 'cars', date: '2 days ago', featured: true },
  
  // Bikes
  { id: '6', title: 'Royal Enfield Classic 350', price: 145000, location: 'Kalaburagi', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400', category: 'bikes', date: 'Today' },
  { id: '7', title: 'Honda Activa 6G 2023', price: 75000, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400', category: 'bikes', date: 'Today' },
  { id: '8', title: 'KTM Duke 200 - Well Maintained', price: 135000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400', category: 'bikes', date: 'Yesterday' },
  { id: '9', title: 'TVS Jupiter Classic Edition', price: 62000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400', category: 'bikes', date: '3 days ago' },
  { id: '10', title: 'Bajaj Pulsar NS200 2022', price: 115000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400', category: 'bikes', date: '3 days ago' },
  
  // Mobiles
  { id: '11', title: 'iPhone 14 Pro Max 256GB', price: 89000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', category: 'mobiles', date: 'Today', featured: true },
  { id: '12', title: 'Samsung Galaxy S23 Ultra', price: 75000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', category: 'mobiles', date: 'Today' },
  { id: '13', title: 'OnePlus 11 5G 256GB', price: 48000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', category: 'mobiles', date: 'Yesterday' },
  { id: '14', title: 'Realme GT Neo 3 150W', price: 28000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', category: 'mobiles', date: 'Yesterday' },
  { id: '15', title: 'Xiaomi 13 Pro - Like New', price: 55000, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400', category: 'mobiles', date: '2 days ago' },
  { id: '16', title: 'Vivo V27 Pro 5G', price: 32000, location: 'Pune', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', category: 'mobiles', date: '2 days ago' },
  
  // Electronics
  { id: '17', title: 'MacBook Pro M2 14inch', price: 145000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', category: 'electronics', date: 'Today', featured: true },
  { id: '18', title: 'Sony Bravia 55" 4K Smart TV', price: 52000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', category: 'electronics', date: 'Today' },
  { id: '19', title: 'Dell Gaming Laptop G15', price: 78000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', category: 'electronics', date: 'Yesterday' },
  { id: '20', title: 'Canon EOS 1500D DSLR Kit', price: 32000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', category: 'electronics', date: 'Yesterday' },
  { id: '21', title: 'Sony PS5 Console + 2 Games', price: 45000, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', category: 'electronics', date: '2 days ago' },
  { id: '22', title: 'Apple Watch Series 8', price: 35000, location: 'Pune', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', category: 'electronics', date: '3 days ago' },
  
  // Furniture
  { id: '23', title: 'L-Shaped Sofa Set - Premium', price: 45000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'furniture', date: 'Today' },
  { id: '24', title: 'King Size Bed with Storage', price: 28000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', category: 'furniture', date: 'Today' },
  { id: '25', title: 'Dining Table 6 Seater Wooden', price: 22000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400', category: 'furniture', date: 'Yesterday' },
  { id: '26', title: 'Office Chair Ergonomic', price: 8500, location: 'Kalaburagi', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400', category: 'furniture', date: '2 days ago' },
  { id: '27', title: 'Wardrobe 3 Door with Mirror', price: 18000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400', category: 'furniture', date: '3 days ago' },
  
  // Fashion
  { id: '28', title: 'Lehenga Choli - Designer Piece', price: 12000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400', category: 'fashion', date: 'Today' },
  { id: '29', title: 'Men Formal Suit - Raymond', price: 8500, location: 'Delhi', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', category: 'fashion', date: 'Today' },
  { id: '30', title: 'Saree Banarasi Silk Original', price: 15000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', category: 'fashion', date: 'Yesterday' },
  { id: '31', title: 'Nike Air Jordan Sneakers', price: 9500, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'fashion', date: '2 days ago', featured: true },
  
  // Books
  { id: '32', title: 'Complete UPSC Book Set', price: 3500, location: 'Delhi', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', category: 'books', date: 'Today' },
  { id: '33', title: 'Engineering Books Collection', price: 2000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400', category: 'books', date: 'Yesterday' },
  { id: '34', title: 'Medical Books MBBS All Years', price: 4500, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', category: 'books', date: '2 days ago' },
  
  // Sports
  { id: '35', title: 'Gym Equipment Full Set', price: 35000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', category: 'sports', date: 'Today' },
  { id: '36', title: 'Cricket Kit SG Complete', price: 8000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', category: 'sports', date: 'Today' },
  { id: '37', title: 'Treadmill Automatic', price: 25000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400', category: 'sports', date: 'Yesterday' },
  
  // Property
  { id: '38', title: '2BHK Flat for Rent - Furnished', price: 18000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', category: 'property', date: 'Today', featured: true },
  { id: '39', title: '3BHK Villa for Sale', price: 8500000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', category: 'property', date: 'Today' },
  { id: '40', title: 'Office Space 1000 sqft', price: 45000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', category: 'property', date: 'Yesterday' },
  { id: '41', title: 'PG Accommodation for Girls', price: 8000, location: 'Pune', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', category: 'property', date: '2 days ago' },
  
  // More Products
  { id: '42', title: 'Maruti Alto 800 2018', price: 280000, location: 'Kalaburagi', image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400', category: 'cars', date: '3 days ago' },
  { id: '43', title: 'Hero Splendor Plus 2022', price: 55000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'bikes', date: '3 days ago' },
  { id: '44', title: 'iPhone 13 128GB Green', price: 52000, location: 'Pune', image: 'https://images.unsplash.com/photo-1632661674596-df8be59a8b34?w=400', category: 'mobiles', date: '4 days ago' },
  { id: '45', title: 'Samsung 32" LED TV', price: 15000, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400', category: 'electronics', date: '4 days ago' },
  { id: '46', title: 'Study Table with Chair', price: 4500, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', category: 'furniture', date: '4 days ago' },
  { id: '47', title: 'Sherwani Wedding Collection', price: 18000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400', category: 'fashion', date: '5 days ago' },
  { id: '48', title: 'Dumbbells Set 20kg', price: 3500, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', category: 'sports', date: '5 days ago' },
  { id: '49', title: 'Shop for Rent Main Road', price: 25000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', category: 'property', date: '5 days ago' },
  { id: '50', title: 'Volkswagen Polo GT TSI', price: 650000, location: 'Delhi', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400', category: 'cars', date: '6 days ago' },
  { id: '51', title: 'Yamaha FZ V3 2023', price: 105000, location: 'Chennai', image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400', category: 'bikes', date: '6 days ago' },
  { id: '52', title: 'Pixel 7 Pro 128GB', price: 48000, location: 'Bangalore', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', category: 'mobiles', date: '6 days ago' },
  { id: '53', title: 'Air Conditioner 1.5 Ton', price: 28000, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', category: 'electronics', date: 'Week ago' },
  { id: '54', title: 'Sofa cum Bed Foldable', price: 15000, location: 'Pune', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400', category: 'furniture', date: 'Week ago' },
  { id: '55', title: 'Designer Handbag Louis V', price: 25000, location: 'Mumbai', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'fashion', date: 'Week ago' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};
