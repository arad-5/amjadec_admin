export function faSlug(text) {
    return (
        text
            .toString()
            .trim()
            .toLowerCase()
            // تنها حروف فارسی (؀-ۿ)، لاتین، اعداد، فاصله و خط تیره را نگه‌دار
            .replace(/[^؀-ۿa-z0-9\s-]/g, '')
            // فاصله‌ها را به خط تیره تبدیل کن
            .replace(/\s+/g, '-')
            // چند خط تیره پشت‌سرهم را به یک خط تیره کاهش بده
            .replace(/-+/g, '-')
    )
}
