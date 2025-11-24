import { PremiumLoading } from '@/components/shared/PremiumLoading';

export default function ContactLoading() {
    return (
        <div className="min-h-screen soft-gradient-bg">
            <section className="section-padding">
                <div className="container-custom">
                    <PremiumLoading message="กำลังโหลด..." showLogo={true} />
                </div>
            </section>
        </div>
    );
}
