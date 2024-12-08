// Supplier Class
class Supplier {
    constructor({
        id = null,
        externalId = '',
        sellerId = '',
        name = '',
        phone = '',
        email = '',
        website = '',
        speciality = '',
        logo = '',
        description = '',
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.externalId = externalId;
        this.sellerId = sellerId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.speciality = speciality;
        this.logo = logo;
        this.description = description;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }
}

// SupplierUpsert Class
class SupplierUpsert {
    constructor({
        name = '',
        sellerId = '',
        phone = '',
        email = '',
        website = '',
        speciality = '',
        logo = '',
        description = '',
        externalId = ''
    } = {}) {
        this.name = name;
        this.sellerId = sellerId;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.speciality = speciality;
        this.logo = logo;
        this.description = description;
        this.externalId = externalId;
    }
}

// SupplierUpdateRequest Class
class SupplierUpdateRequest {
    constructor({ supplier = {}, updateMasks = [] } = {}) {
        this.supplier = new SupplierUpsert(supplier);
        this.updateMasks = updateMasks;
    }
}

// SearchQuerySupplier Class
class SearchQuerySupplier {
    constructor({
        storeExternalId = '',
        sellerId = '',
        name = '',
        page = '',
        size = ''
    } = {}) {
        this.storeExternalId = storeExternalId;
        this.sellerId = sellerId;
        this.name = name;
        this.page = page;
        this.size = size;
    }
}

// PaginatedSupplier Class
class PaginatedSupplier {
    constructor({
        suppliers = [],
        page = 0,
        totalPerPage = 0,
        total = 0,
        totalPages = 0
    } = {}) {
        this.suppliers = suppliers.map(supplier => new Supplier(supplier));
        this.page = page;
        this.totalPerPage = totalPerPage;
        this.total = total;
        this.totalPages = totalPages;
    }
}

// Export Classes
module.exports = {
    Supplier,
    SupplierUpsert,
    SupplierUpdateRequest,
    SearchQuerySupplier,
    PaginatedSupplier
};
