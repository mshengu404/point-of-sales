import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductService } from '../service/product.service';
import Product from '../model/product';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public createProduct = async (request: FastifyRequest, response: FastifyReply) => {
        const { name, price, description, quantity } = request.body as Product;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return response.status(400).send({ success: false, message: 'Product name is required' });
        }
        if (typeof price !== 'number' || price <= 0) {
            return response.status(400).send({ success: false, message: 'Price must be a positive number' });
        }
        if (typeof quantity !== 'number' || quantity < 0) {
            return response.status(400).send({ success: false, message: 'Quantity must be a non-negative number' });
        }

        try {
            const newProduct = await this.productService.createProduct({ name, price, description, quantity } as Product);
            return response.status(201).send({ success: true, data: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            return response.status(500).send({ success: false, message: 'Internal server error' });
        }
    };

    public getAllProducts = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const products = await this.productService.getAllProducts();
            response.send({ success: true, data: products });
        } catch (error) {
            console.error('Error fetching products:', error);
            return response.status(500).send({ success: false, message: 'Internal server error' });
        }
    };

    public updateProduct = async (request: FastifyRequest, response: FastifyReply) => {
        const { id, name, price, description, quantity } = request.body as Product;

        // Basic validation
        if (typeof id !== 'number' || id <= 0) {
            return response.status(400).send({ success: false, message: 'Product ID must be a positive integer' });
        }
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return response.status(400).send({ success: false, message: 'Product name is required' });
        }
        if (price && (typeof price !== 'number' || price <= 0)) {
            return response.status(400).send({ success: false, message: 'Price must be a positive number' });
        }
        if (quantity && (typeof quantity !== 'number' || quantity < 0)) {
            return response.status(400).send({ success: false, message: 'Quantity must be a non-negative number' });
        }

        try {
            const updatedProduct = await this.productService.updateProduct({ id, name, price, description, quantity } as Product);
            if (!updatedProduct) {
                return response.status(404).send({ success: false, message: 'Product not found' });
            }
            return response.send({ success: true, data: updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            return response.status(500).send({ success: false, message: 'Internal server error' });
        }
    };

    public deleteProduct = async (request: FastifyRequest, response: FastifyReply) => {
        const { id } = request.params as { id: number };

        if (id <= 0) {
            return response.status(400).send({ success: false, message: 'Product ID must be a positive integer' });
        }

        try {
            const deleted = await this.productService.deleteProduct(id);
            if (!deleted) {
                return response.status(404).send({ success: false, message: 'Product not found' });
            }
            return response.send({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return response.status(500).send({ success: false, message: 'Internal server error' });
        }
    };
}
