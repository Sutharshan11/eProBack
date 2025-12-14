"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const branchRoutes_1 = __importDefault(require("./routes/branchRoutes"));
const assetRoutes_1 = __importDefault(require("./routes/assetRoutes"));
const transferRoutes_1 = __importDefault(require("./routes/transferRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/branches', branchRoutes_1.default);
app.use('/api/assets', assetRoutes_1.default);
app.use('/api/transfers', transferRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Asset Management System API');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
