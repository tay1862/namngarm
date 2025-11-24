import { PremiumLoading } from '@/components/shared/PremiumLoading';

export default function ProductsLoading() {
    return (
        <div className="min-h-screen soft-gradient-bg">
            <section className="section-padding">
                <div className="container-custom">
                    <PremiumLoading message="กำลังโหลดสินค้า..." showLogo={true} />
                </div>
            </section>
        </div>
    );
}
