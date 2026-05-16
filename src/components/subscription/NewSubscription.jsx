// "use client";
// import React, { useEffect, useState } from "react";
// import { Row, Col, Card, Button, Typography } from "antd";
// import {
//     useAnswerAQuestionUsingFormMutation,
//     useCancelSubMutation,
//     useGetAllSubscriptionsQuery,
//     useRequestForViseMutation,
//     useTakeSubscriptionMutation,
// } from "@/redux/fetures/subscription/subscription";
// import toast, { Toaster } from "react-hot-toast";
// import moment from "moment";
// import OfflineSub from "./OfflineSub";
// import { useGetMyprofileForsubQuery } from "@/redux/fetures/user/getUsers";
// import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

// const NewSubscription = () => {

//     const [buySubscriptionForOthersSub] = useAnswerAQuestionUsingFormMutation();

//     const { data: userInfo } = useGetMyprofileForsubQuery();
//     const fullUser = userInfo?.data?.attributes;
//     // console.log()

//     const navigate = useRouter();



//     const { data, isLoading, error } = useGetAllSubscriptionsQuery();
//     const [takeSubscription] = useRequestForViseMutation();

//     const subscriptionsUserInfo =
//         data?.data?.attributes?.result?.results || [];
//     const subscriptions =
//         data?.data?.attributes?.subscription || [];

//     const [subscriptionsList, setSubscriptionsList] = useState([]);

//     /* ---------------- FORMAT SUBSCRIPTIONS ---------------- */
//     useEffect(() => {
//         const formattedPlans = [];

//         // 1️⃣ Backend-driven plans

//         subscriptions?.forEach((subscription) => {
//             if (subscription.subscriptionType === "standard") {
//                 formattedPlans.push({
//                     id: subscription._subscriptionId,
//                     name: "STANDARD MEMBERSHIP",
//                     price: `$${subscription.amount}/month`,
//                     subtitle:
//                         "A low-cost membership that unlocks access to the entire Suplify ecosystem.",
//                     subscriptionType: "standard",
//                     perks: [
//                         "Access to the full Suplify platform",
//                         "Huge discounts on high-quality supplements",
//                         "Discounts on coaching",
//                         "Discounts on doctor consultations",
//                         "Discounts on lab testing",
//                         "Discounts on VO₂ Max, RMR, HRV testing",
//                         "Discounts on protocol upgrades",
//                         "Member-only pricing on wellness tools & programs",
//                         "Access to challenges, webinars, and member events",
//                     ],
//                     idealFor:
//                         "Anyone wanting high-end wellness resources at wholesale pricing — without coaching.",
//                 });
//             }

//             if (subscription.subscriptionType === "standardPlus") {
//                 formattedPlans.push({
//                     id: subscription._subscriptionId,
//                     name: "SUPLIFY+ (COACHING)",
//                     price: `$${subscription.amount}/month`,
//                     title: 'Your Specialist. Your Strategy. Your Upgrade.',
//                     subtitle: "This membership gives clients premium access to the Suplify ecosystem along with direct access to hire a Suplify Specialist for personalized guidance and accountability.",
//                     subscriptionType: "standardPlus",
//                     perks: [
//                         "Everything in Standard Membership",
//                         "Free 30 - minute consultation",
//                         "Personalized health & performance strategy",
//                         "Nutrition setup & guidance",
//                         "Weekly coaching & accountability",
//                         "Training & protocol adjustments",
//                         "Priority access to specialists",
//                         "Free webinar & seminar entries",
//                         "Preferred access to challenges & events",
//                         "Product giveaways",
//                         "Members - only perks & upgrades"
//                     ],
//                     idealFor:
//                         "Clients wanting structure, accountability, expert guidance, and a complete health & performance system.",
//                 });
//             }
//         });


//         if (subscriptions) {

//             formattedPlans.push({
//                 id: "vise-static-plan",
//                 name: "VISE (PREMIUM MEDICAL PROGRAM)",
//                 price: "Pricing Varies",
//                 title: ' The Complete Medical + Performance Transformation Program (16-week personalized protocol)',
//                 subtitle:
//                     "The highest level of Suplify — the full medical, diagnostic, and specialist-driven experience for clients seeking elite transformation, longevity optimization, and deep health analysis.",
//                 subscriptionType: "vise",
//                 perks: [
//                     "Full lab panel",
//                     "VO₂ Max, RMR, and HRV testing",
//                     "Doctor consultation to review all findings",
//                     "Fully customized medical & performance protocol",
//                     "Assigned Specialist for full program execution",
//                     "Nutrition, training, supplement & lifestyle plan",
//                     "Ongoing adjustments and clinical oversight",
//                     "All costs bundled into one all-inclusive program",
//                 ],
//                 idealFor:
//                     "Clients wanting complete lifestyle redesign, medical optimization, and data-driven results with full doctor + specialist support.",
//             });

//             setSubscriptionsList(formattedPlans);
//         }

//         // 2️⃣ MANUALLY ADD VISE (NOT FROM BACKEND)
//     }, [subscriptions]);



//     /* ---------------- MUTATIONS ---------------- */
//     const [takeSub] = useTakeSubscriptionMutation();
//     const [cancelSub] = useCancelSubMutation();

//     const activeSubscriptionType =
//         subscriptionsUserInfo[0]?.userId?.subscriptionType;

//     const handleSubscribe = async (plan) => {

//         if (!fullUser) {
//             return navigate.push('/auth/login')
//         }


//         if (fullUser?.isFormSubmitted) {
//             try {
//                 const res = await takeSub(plan).unwrap();
//                 if (res?.code === 200) {
//                     toast.success(res?.message);
//                     window.location.href = res?.data?.attributes;
//                 } else {
//                     toast.error(res?.message);
//                 }
//             } catch (err) {
//                 toast.error(err?.data?.message || "Subscription failed");
//             }
//         } else {
//             navigate.push(`/dashboard/subscription/question-form?id=${plan?.id}`);
//         }
//     };

//     const handleCancelSubscription = async () => {
//         try {
//             const res = await cancelSub().unwrap();
//             if (res?.code === 200) {
//                 toast.success(res?.message);
//             } else {
//                 toast.error(res?.message);
//             }
//         } catch (err) {
//             toast.error(err?.data?.message || "Cancel failed");
//         }
//     };

//     const handleApplyForVise = async () => {
//         // toast.success("Your application has been submitted.");
//         if (!fullUser) {
//             return navigate.push('/auth/login')
//         }

//         if (fullUser?.isFormSubmitted) {
//             try {

//                 const res = await takeSubscription().unwrap();
//                 console.log(res)
//                 if (res?.code === 200) {
//                     toast.success(res?.message);
//                 }
//             } catch (error) {
//                 toast.error(error?.data?.message || 'Failed to take subscription');
//             }
//         }
//         else {
//             navigate.push(`/dashboard/subscription/question-form?id=vise`);
//         }
//     };


//     /* ---------------- UI ---------------- */
//     return (
//         <div style={{ padding: "50px", background: "#f9f9f9" }}>
//             <Toaster />

//             {/* USER INFO */}
//             {subscriptionsUserInfo.length > 0 && (
//                 <div className="bg-green-100 rounded-lg font-semibold p-5 max-w-md mb-6">
//                     <p>Name: {subscriptionsUserInfo[0]?.userId?.name}</p>
//                     <p>Email: {subscriptionsUserInfo[0]?.userId?.email}</p>
//                     <p>Active Plan: {activeSubscriptionType}</p>
//                 </div>
//             )}

//             {/* SUBSCRIPTION HISTORY */}
//             {subscriptionsUserInfo.length > 0 && (
//                 <div className="overflow-x-auto mb-10">
//                     <table className="min-w-full border">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="p-2">User Subscription Id</th>
//                                 <th className="p-2">Subscription Name</th>
//                                 <th className="p-2">Start</th>
//                                 <th className="p-2">Current Period Start Date </th>
//                                 <th className="p-2">Cancelled At Period End </th>
//                                 <th className="p-2">Cancel Date</th>
//                                 <th className="p-2">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {subscriptionsUserInfo.map((item, i) => (
//                                 <tr key={i} className="text-center border-t">
//                                     <td className="p-2">
//                                         {item?._userSubscriptionId}
//                                     </td>
//                                     <td className="p-2">
//                                         {item?.subscriptionPlanId?.subscriptionName}
//                                     </td>
//                                     <td className="p-2">
//                                         {moment(item?.subscriptionStartDate).format("YYYY-MM-DD")}
//                                     </td>
//                                     <td className="p-2">
//                                         {moment(item?.currentPeriodStartDate).format("YYYY-MM-DD")}
//                                     </td>
//                                     <td className="p-2">
//                                         {item?.cancelledAtPeriodEnd ? "True" : "False"}
//                                     </td>
//                                     <td className="p-2">
//                                         {moment(item?.expirationDate).format("YYYY-MM-DD")}
//                                     </td>
//                                     <td className="p-2 font-semibold">
//                                         {item?.status}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* ERROR */}
//             {
//                 error ?
//                     <OfflineSub />
//                     :
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
//                         {subscriptionsList.map((plan) => (
//                             <div
//                                 key={plan.id}
//                                 className="relative flex flex-col justify-between h-full w-full overflow-hidden rounded-xl bg-white shadow-[0_6px_15px_rgba(0,0,0,0.1)] p-6"
//                             >
//                                 {/* ACTIVE BADGE */}
//                                 {plan.subscriptionType === activeSubscriptionType && (
//                                     <span className="absolute top-3 right-[-40px] rotate-45 bg-green-500 text-white px-10 py-1 text-sm font-semibold">
//                                         Active
//                                     </span>
//                                 )}

//                                 <div>
//                                     {/* TITLE */}
//                                     <h3 className="text-lg font-bold text-gray-900">
//                                         {plan.name}
//                                     </h3>

//                                     {/* PRICE */}
//                                     <p className="text-3xl font-extrabold mt-3 text-gray-900">
//                                         {plan.price}
//                                     </p>

//                                     {/* TRIAL */}
//                                     {plan.trial && (
//                                         <p className="text-sm text-gray-500 mt-1">
//                                             {plan.trial}
//                                         </p>
//                                     )}

//                                     {/* TITLE & SUBTITLE */}
//                                     {plan.title && (
//                                         <p className="mt-3 font-semibold text-gray-800">
//                                             {plan.title}
//                                         </p>
//                                     )}

//                                     <p className="mt-2 text-gray-600 font-medium">
//                                         {plan.subtitle}
//                                     </p>

//                                     {/* PERKS */}
//                                     <ul className="mt-4 space-y-2 text-sm text-gray-700">
//                                         {plan.perks.map((perk, i) => (
//                                             <li key={i}>• {perk}</li>
//                                         ))}
//                                     </ul>
//                                     {/* IDEAL FOR */}
//                                     <p className="mt-4 text-sm text-gray-600">
//                                         <span className="font-semibold">Ideal For:</span> {plan.idealFor}
//                                     </p>
//                                 </div>


//                                 {/* ACTION BUTTON */}
//                                 <div className="mt-6">
//                                     {plan.subscriptionType === activeSubscriptionType ? (
//                                         <button
//                                             onClick={handleCancelSubscription}
//                                             className="w-full rounded-lg border border-red-500 text-red-600 py-2 font-semibold hover:bg-red-50 transition"
//                                         >
//                                             Cancel Subscription
//                                         </button>
//                                     ) : plan.subscriptionType === "vise" ? (
//                                         <button
//                                             onClick={handleApplyForVise}
//                                             className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition"
//                                         >
//                                             Apply For Vise
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleSubscribe(plan)}
//                                             className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition"
//                                         >
//                                             Subscribe Now
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//             }

//         </div>
//     );
// };

// export default NewSubscription;



"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import OfflineSub from "./OfflineSub";
import { useGetMyprofileForsubQuery } from "@/redux/fetures/user/getUsers";
import { useRouter } from "next/navigation";
import {
    useAnswerAQuestionUsingFormMutation,
    useCancelSubMutation,
    useGetAllSubscriptionsQuery,
    useRequestForViseMutation,
    useTakeSubscriptionMutation,
} from "@/redux/fetures/subscription/subscription";
import ModalTermsData from "./ModalTermsData";

// ── Terms & Conditions Modal (Portal) ────────────────────────────
const TermsModal = ({ plan, onClose, onConfirm }) => {
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!agreed) return;
        setLoading(true);
        await onConfirm(plan);
        setLoading(false);
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Terms & Conditions</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl font-light"
                    >
                        ×
                    </button>
                </div>

                {/* Plan badge */}
                <div className="px-6 pt-4">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {plan?.name}
                    </span>
                </div>

                {/* Scrollable terms body */}
                <ModalTermsData />



                {/* Agree checkbox */}
                <div className="px-6 py-3 border-t border-gray-100">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5 shrink-0">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="peer w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                            />
                        </div>
                        <span className="text-sm text-gray-600 leading-snug">
                            I have read and agree to the{' '}
                            <span className="text-blue-600 font-medium underline cursor-pointer">Terms & Conditions</span>
                            {' '}and{' '}
                            <span className="text-blue-600 font-medium underline cursor-pointer">Privacy Policy</span>
                        </span>
                    </label>
                </div>

                {/* Footer buttons */}
                <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!agreed || loading}
                        className={`flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition flex items-center justify-center gap-2
                            ${agreed && !loading
                                ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                                : 'bg-blue-300 cursor-not-allowed opacity-60'
                            }`}
                    >
                        {loading && (
                            <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        )}
                        {loading ? 'Processing...' : 'Confirm & Proceed'}
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
};

// ── Main Component ────────────────────────────────────────────────
const NewSubscription = () => {

    const [buySubscriptionForOthersSub] = useAnswerAQuestionUsingFormMutation();
    const { data: userInfo } = useGetMyprofileForsubQuery();
    const fullUser = userInfo?.data?.attributes;

    const navigate = useRouter();

    const { data, isLoading, error } = useGetAllSubscriptionsQuery();
    const [takeSubscription] = useRequestForViseMutation();

    const subscriptionsUserInfo = data?.data?.attributes?.result?.results || [];
    const subscriptions = data?.data?.attributes?.subscription || [];

    const [subscriptionsList, setSubscriptionsList] = useState([]);

    // ── Modal state ──
    const [modalPlan, setModalPlan] = useState(null);     // which plan triggered modal
    const [modalType, setModalType] = useState(null);     // 'subscribe' | 'vise'

    /* ---------------- FORMAT SUBSCRIPTIONS ---------------- */
    useEffect(() => {
        const formattedPlans = [];

        subscriptions?.forEach((subscription) => {
            if (subscription.subscriptionType === "standard") {
                formattedPlans.push({
                    id: subscription._subscriptionId,
                    name: "STANDARD MEMBERSHIP",
                    price: `$${subscription.amount}/month`,
                    subtitle:
                        "A low-cost membership that unlocks access to the entire Suplify ecosystem.",
                    subscriptionType: "standard",
                    perks: [
                        "Access to the full Suplify platform",
                        "Huge discounts on high-quality supplements",
                        "Discounts on coaching",
                        "Discounts on doctor consultations",
                        "Discounts on lab testing",
                        "Discounts on VO₂ Max, RMR, HRV testing",
                        "Discounts on protocol upgrades",
                        "Member-only pricing on wellness tools & programs",
                        "Access to challenges, webinars, and member events",
                    ],
                    idealFor:
                        "Anyone wanting high-end wellness resources at wholesale pricing — without coaching.",
                });
            }

            if (subscription.subscriptionType === "standardPlus") {
                formattedPlans.push({
                    id: subscription._subscriptionId,
                    name: "SUPLIFY+ (COACHING)",
                    price: `$${subscription.amount}/month`,
                    title: "Your Specialist. Your Strategy. Your Upgrade.",
                    subtitle:
                        "This membership gives clients premium access to the Suplify ecosystem along with direct access to hire a Suplify Specialist for personalized guidance and accountability.",
                    subscriptionType: "standardPlus",
                    perks: [
                        "Everything in Standard Membership",
                        "Free 30-minute consultation",
                        "Personalized health & performance strategy",
                        "Nutrition setup & guidance",
                        "Weekly coaching & accountability",
                        "Training & protocol adjustments",
                        "Priority access to specialists",
                        "Free webinar & seminar entries",
                        "Preferred access to challenges & events",
                        "Product giveaways",
                        "Members-only perks & upgrades",
                    ],
                    idealFor:
                        "Clients wanting structure, accountability, expert guidance, and a complete health & performance system.",
                });
            }
        });

        if (subscriptions) {
            formattedPlans.push({
                id: "vise-static-plan",
                name: "VISE (PREMIUM MEDICAL PROGRAM)",
                price: "Pricing Varies",
                title: "The Complete Medical + Performance Transformation Program (16-week personalized protocol)",
                subtitle:
                    "The highest level of Suplify — the full medical, diagnostic, and specialist-driven experience for clients seeking elite transformation, longevity optimization, and deep health analysis.",
                subscriptionType: "vise",
                perks: [
                    "Full lab panel",
                    "VO₂ Max, RMR, and HRV testing",
                    "Doctor consultation to review all findings",
                    "Fully customized medical & performance protocol",
                    "Assigned Specialist for full program execution",
                    "Nutrition, training, supplement & lifestyle plan",
                    "Ongoing adjustments and clinical oversight",
                    "All costs bundled into one all-inclusive program",
                ],
                idealFor:
                    "Clients wanting complete lifestyle redesign, medical optimization, and data-driven results with full doctor + specialist support.",
            });

            setSubscriptionsList(formattedPlans);
        }
    }, [subscriptions]);

    /* ---------------- MUTATIONS ---------------- */
    const [takeSub] = useTakeSubscriptionMutation();
    const [cancelSub] = useCancelSubMutation();

    const activeSubscriptionType = subscriptionsUserInfo[0]?.userId?.subscriptionType;

    /* ── actual subscribe logic (called AFTER terms agreed) ── */
    const executeSubscribe = async (plan) => {
        if (!fullUser) return navigate.push("/auth/login");

        if (fullUser?.isFormSubmitted) {
            try {
                const res = await takeSub(plan).unwrap();
                if (res?.code === 200) {
                    toast.success(res?.message);
                    window.location.href = res?.data?.attributes;
                } else {
                    toast.error(res?.message);
                }
            } catch (err) {
                toast.error(err?.data?.message || "Subscription failed");
            }
        } else {
            navigate.push(`/dashboard/subscription/question-form?id=${plan?.id}`);
        }
    };

    /* ── actual vise logic (called AFTER terms agreed) ── */
    const executeApplyForVise = async () => {
        if (!fullUser) return navigate.push("/auth/login");

        if (fullUser?.isFormSubmitted) {
            try {
                const res = await takeSubscription().unwrap();
                if (res?.code === 200) {
                    toast.success(res?.message);
                }
            } catch (error) {
                toast.error(error?.data?.message || "Failed to take subscription");
            }
        } else {
            navigate.push(`/dashboard/subscription/question-form?id=vise`);
        }
    };

    /* ── button click → open modal ── */
    const handleSubscribeClick = (plan) => {
        if (!fullUser) return navigate.push("/auth/login");
        setModalPlan(plan);
        setModalType("subscribe");
    };

    const handleViseClick = (plan) => {
        if (!fullUser) return navigate.push("/auth/login");
        setModalPlan(plan);
        setModalType("vise");
    };

    /* ── modal confirm → run real action ── */
    const handleModalConfirm = async (plan) => {
        if (modalType === "subscribe") {
            await executeSubscribe(plan);
        } else if (modalType === "vise") {
            await executeApplyForVise();
        }
    };

    const handleCancelSubscription = async () => {
        try {
            const res = await cancelSub().unwrap();
            if (res?.code === 200) {
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error(err?.data?.message || "Cancel failed");
        }
    };

    /* ---------------- UI ---------------- */
    return (
        <div style={{ padding: "50px", background: "#f9f9f9" }}>
            <Toaster />

            {/* ── Terms Modal (portal — renders above everything) ── */}
            {modalPlan && (
                <TermsModal
                    plan={modalPlan}
                    onClose={() => { setModalPlan(null); setModalType(null); }}
                    onConfirm={handleModalConfirm}
                />
            )}

            {/* USER INFO */}
            {subscriptionsUserInfo.length > 0 && (
                <div className="bg-green-100 rounded-lg font-semibold p-5 max-w-md mb-6">
                    <p>Name: {subscriptionsUserInfo[0]?.userId?.name}</p>
                    <p>Email: {subscriptionsUserInfo[0]?.userId?.email}</p>
                    <p>Active Plan: {activeSubscriptionType}</p>
                </div>
            )}

            {/* SUBSCRIPTION HISTORY */}
            {subscriptionsUserInfo.length > 0 && (
                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">User Subscription Id</th>
                                <th className="p-2">Subscription Name</th>
                                <th className="p-2">Start</th>
                                <th className="p-2">Current Period Start Date</th>
                                <th className="p-2">Cancelled At Period End</th>
                                <th className="p-2">Cancel Date</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptionsUserInfo.map((item, i) => (
                                <tr key={i} className="text-center border-t">
                                    <td className="p-2">{item?._userSubscriptionId}</td>
                                    <td className="p-2">{item?.subscriptionPlanId?.subscriptionName}</td>
                                    <td className="p-2">{moment(item?.subscriptionStartDate).format("YYYY-MM-DD")}</td>
                                    <td className="p-2">{moment(item?.currentPeriodStartDate).format("YYYY-MM-DD")}</td>
                                    <td className="p-2">{item?.cancelledAtPeriodEnd ? "True" : "False"}</td>
                                    <td className="p-2">{moment(item?.expirationDate).format("YYYY-MM-DD")}</td>
                                    <td className="p-2 font-semibold">{item?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* PLANS */}
            {error ? (
                <OfflineSub />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {subscriptionsList.map((plan) => (
                        <div
                            key={plan.id}
                            className="relative flex flex-col justify-between h-full w-full overflow-hidden rounded-xl bg-white shadow-[0_6px_15px_rgba(0,0,0,0.1)] p-6"
                        >
                            {/* ACTIVE BADGE */}
                            {plan.subscriptionType === activeSubscriptionType && (
                                <span className="absolute top-3 right-[-40px] rotate-45 bg-green-500 text-white px-10 py-1 text-sm font-semibold">
                                    Active
                                </span>
                            )}

                            <div>
                                {/* TITLE */}
                                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>

                                {/* PRICE */}
                                <p className="text-3xl font-extrabold mt-3 text-gray-900">{plan.price}</p>

                                {/* TRIAL */}
                                {plan.trial && (
                                    <p className="text-sm text-gray-500 mt-1">{plan.trial}</p>
                                )}

                                {/* SUBTITLE TITLE */}
                                {plan.title && (
                                    <p className="mt-3 font-semibold text-gray-800">{plan.title}</p>
                                )}

                                <p className="mt-2 text-gray-600 font-medium">{plan.subtitle}</p>

                                {/* PERKS */}
                                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                    {plan.perks.map((perk, i) => (
                                        <li key={i}>• {perk}</li>
                                    ))}
                                </ul>

                                {/* IDEAL FOR */}
                                <p className="mt-4 text-sm text-gray-600">
                                    <span className="font-semibold">Ideal For:</span> {plan.idealFor}
                                </p>
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="mt-6">
                                {plan.subscriptionType === activeSubscriptionType ? (
                                    <button
                                        onClick={handleCancelSubscription}
                                        className="w-full rounded-lg border border-red-500 text-red-600 py-2 font-semibold hover:bg-red-50 transition"
                                    >
                                        Cancel Subscription
                                    </button>
                                ) : plan.subscriptionType === "vise" ? (
                                    <button
                                        onClick={() => handleViseClick(plan)}
                                        className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition active:scale-95"
                                    >
                                        Apply For Vise
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSubscribeClick(plan)}
                                        className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition active:scale-95"
                                    >
                                        Subscribe Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewSubscription;