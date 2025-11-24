import { PremiumLoading } from '@/components/shared/PremiumLoading';

export default function ArticlesLoading() {
    return (
        <div className="min-h-screen soft-gradient-bg">
            <section className="section-padding">
                <div className="container-custom">
                    <PremiumLoading message="กำลังโหลดบทความ..." showLogo={true} />
                </div>
            </section>
        </div>
    );
}
