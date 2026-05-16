import React from 'react';

const sections = [
    {
        title: 'Educational Purpose Only',
        body: `Suplify and its representatives provide educational, informational, wellness, fitness, nutrition, supplementation, and performance-based guidance only. Nothing provided through Suplify is intended to diagnose, treat, cure, or prevent any disease or medical condition unless explicitly stated by a licensed medical provider acting within their legal scope of practice. All coaching, training, nutrition guidance, supplement suggestions, educational materials, workout programming, recovery recommendations, biometric analysis, and performance recommendations are intended solely for educational and informational purposes.`,
    },
    {
        title: 'No Medical Advice',
        body: `Unless specifically provided by a licensed physician or qualified healthcare provider, no information provided by Suplify, its owners, staff, specialists, contractors, coaches, affiliates, or representatives shall be considered medical advice.`,
        bullets: [
            'Suplify Specialists are not acting as your primary care physician.',
            'Recommendations made through Suplify are not substitutes for professional medical evaluation or treatment.',
            'You should consult your physician before beginning any exercise, supplement, nutrition, recovery, wellness, or performance program.',
            'You acknowledge full responsibility for consulting with your healthcare provider regarding any medications, medical conditions, pregnancies, surgeries, injuries, cardiovascular risks, hormonal conditions, metabolic disorders, or other health concerns.',
        ],
    },
    {
        title: 'Assumption of Risk',
        body: `You understand and voluntarily accept that participation in any fitness, training, performance, nutrition, wellness, recovery, testing, supplementation, or coaching activity involves inherent risks. These risks may include but are not limited to: muscle strains, sprains, falls, illness, allergic reactions, heart attack, stroke, hormonal complications, injury, disability, adverse supplement reactions, equipment malfunction, and death. You knowingly and voluntarily assume full responsibility for all risks associated with participation in any Suplify-related activity, both known and unknown, even if arising from negligence.`,
    },
    {
        title: 'Release of Liability',
        body: `To the fullest extent permitted by law, you hereby release, waive, discharge, and hold harmless Suplify, its owners, officers, directors, physicians, specialists, coaches, trainers, employees, contractors, affiliates, facilities, partners, sponsors, and representatives from any and all claims, liabilities, demands, damages, losses, costs, expenses, or causes of action arising from or related to participation in services, use of facilities, workouts or training, supplement usage, nutrition changes, testing procedures, coaching recommendations, doctor consultations, lab testing, third-party provider services, equipment use, online content, physical or virtual events, injuries, illness, death, financial loss, emotional distress, data inaccuracies, or technical failures. This waiver applies regardless of whether the alleged damages arise from negligence or otherwise.`,
    },
    {
        title: 'No Guaranteed Results',
        body: `You understand that results vary between individuals and that Suplify makes no guarantees regarding weight loss, muscle gain, hormone improvement, athletic performance, health outcomes, longevity outcomes, fat loss, recovery, lab results, metabolic improvements, financial outcomes, business outcomes, or psychological outcomes. Client success depends on numerous factors outside of Suplify's control, including consistency, genetics, adherence, medical history, lifestyle, sleep, stress, nutrition, and personal effort.`,
    },
    {
        title: 'Supplement & Product Disclaimer',
        body: `Any supplement recommendations provided by Suplify are suggestions only. You acknowledge that supplements may interact with medications or medical conditions. You are solely responsible for reviewing ingredients and consulting your physician before use. Suplify is not responsible for allergic reactions, side effects, misuse, manufacturing defects, shipping issues, contamination, misuse of dosage, or adverse outcomes from third-party products. All products are used at your own risk.`,
    },
    {
        title: 'Testing & Lab Disclaimer',
        body: `Metabolic testing, body composition testing, HRV analysis, VO₂ Max testing, RMR testing, bloodwork, and all related assessments are estimates and informational tools only. No testing method is 100% accurate. Testing results may vary due to hydration, equipment variability, human error, user effort, environmental conditions, or software limitations. Suplify is not responsible for decisions made based on testing data. All testing should be interpreted alongside professional medical guidance where appropriate.`,
    },
    {
        title: 'Membership, Billing & Cancellation',
        body: `By enrolling in any membership or recurring payment program, you authorize recurring billing to your selected payment method.`,
        bullets: [
            'Membership fees are non-refundable unless otherwise stated in writing.',
            'Failure to use services does not exempt you from payment obligations.',
            'Membership benefits, pricing, features, and access may change at any time.',
            'Suplify reserves the right to terminate memberships, services, or platform access at its discretion.',
            'Chargebacks made without valid cause may result in account termination and collections action.',
        ],
    },
    {
        title: 'Third-Party Services',
        body: `Suplify may integrate or recommend third-party providers, including but not limited to physicians, laboratories, supplement companies, fitness facilities, coaches, payment processors, software platforms, and diagnostic companies. Suplify is not responsible for the actions, errors, omissions, policies, delays, outcomes, security practices, or conduct of third-party providers.`,
    },
    {
        title: 'Digital Platform & Data',
        body: `You acknowledge that electronic communication is not always secure, technical issues or outages may occur, and Suplify cannot guarantee uninterrupted access to digital systems. By using the platform, you consent to electronic communication and storage of submitted information.`,
    },
    {
        title: 'Intellectual Property',
        body: `All Suplify materials, systems, branding, videos, protocols, programs, educational content, documents, graphics, training systems, and intellectual property remain the sole property of Suplify. No material may be copied, reproduced, distributed, sold, licensed, or shared without written permission.`,
    },
    {
        title: 'Governing Law',
        body: `These Terms & Conditions shall be governed under the laws of the applicable operating state of Suplify, without regard to conflict of law principles. Any disputes arising from use of Suplify services shall be resolved through binding arbitration or the appropriate courts within the applicable jurisdiction.`,
    },
    {
        title: 'Acknowledgement',
        body: `By selecting "I Accept," purchasing services, using the platform, participating in programs, attending events, or accessing any Suplify materials, you acknowledge that you have read and understood these Terms & Conditions, you voluntarily agree to all terms listed above, you understand the risks associated with participation, and you waive certain legal rights, including the right to sue, to the fullest extent permitted by law.`,
    },
];

const ModalTermsData = () => {
    return (
        <div className="px-6 py-4 overflow-y-auto max-h-72 text-sm text-gray-600 leading-relaxed space-y-4">

            {/* Intro */}
            <p>
                By purchasing, accessing, enrolling in, participating in, or using any Suplify service, platform, program,
                coaching, testing, consultation, event, content, supplement recommendation, educational material, or affiliated
                service, you acknowledge that you have read, understood, and voluntarily agreed to the following{' '}
                <strong className="text-gray-800">Terms & Conditions</strong> in full.
            </p>

            {/* Sections */}
            {sections.map((section, i) => (
                <div key={i} className="space-y-1.5">
                    <p className="font-semibold text-gray-800">
                        {i + 1}. {section.title}
                    </p>
                    <p>{section.body}</p>
                    {section.bullets && (
                        <ul className="space-y-1 pl-3">
                            {section.bullets.map((bullet, j) => (
                                <li key={j} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ModalTermsData;