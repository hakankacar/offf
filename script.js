class EmlakYonetimi {
    constructor() {
        // Kategorileri tanımla
        this.categories = [
            { id: 1, name: 'Satılık' },
            { id: 2, name: 'Kiralık' }
        ];

        // Özellikleri al
        this.properties = this.getProperties();
    }

    // Kategorileri getir
    getCategories() {
        return this.categories;
    }

    // Özellikleri getir
    getProperties() {
        const properties = JSON.parse(localStorage.getItem('properties')) || this.generateDefaultProperties();
        return properties;
    }

    // Varsayılan özellikler
    generateDefaultProperties() {
        const defaultProperties = [
            {
                id: 1,
                title: 'İstanbul Satılık Daire',
                image: 'https://picsum.photos/400/300?random=1',
                price: 500000,
                type: 'satilik',
                category: 1,
                city: 'İstanbul',
                district: 'Kadıköy',
                rooms: '2+1',
                size: 100,
                age: 5,
                description: 'Kadıköy merkezde satılık modern daire'
            }
        ];

        localStorage.setItem('properties', JSON.stringify(defaultProperties));
        return defaultProperties;
    }

    // Yeni özellik ekleme
    addProperty(property) {
        const properties = this.getProperties();
        property.id = Date.now();
        properties.push(property);
        this.saveProperties(properties);
    }

    // Özellikleri kaydetme
    saveProperties(properties) {
        localStorage.setItem('properties', JSON.stringify(properties));
    }

    // Kategori adını ID'ye göre getirme
    getCategoryNameById(categoryId) {
        const category = this.categories.find(cat => cat.id == categoryId);
        return category ? category.name : 'Bilinmeyen Kategori';
    }

    // Özellikleri filtreleme
    filterProperties(filters) {
        const properties = this.getProperties();
        return properties.filter(prop => {
            return (
                (!filters.type || prop.type === filters.type) &&
                (!filters.category || prop.category == filters.category) &&
                (!filters.city || prop.city === filters.city) &&
                (!filters.minPrice || prop.price >= filters.minPrice) &&
                (!filters.maxPrice || prop.price <= filters.maxPrice)
            );
        });
    }
}

// Global olarak erişilebilir
window.emlakYonetimi = new EmlakYonetimi();