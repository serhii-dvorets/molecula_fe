import clsx from 'clsx'

type TypographyProps = {
    variant: 
    | 'display-large'
    | 'display-medium'
    | 'display-small'
    | 'headline-large'
    | 'headline-medium'
    | 'headline-small'
    | 'title-large'
    | 'title-medium'
    | 'label-large'
    | 'label-small'
    | 'body-large'
    | 'body-small',
    children: React.ReactNode, 
    className?: string
}

const Typography = ({ variant, children, className = '' }: TypographyProps) => {
	const variantClass = {
		'display-large': 'text-display-large',
		'display-medium': 'text-display-medium',
		'display-small': 'text-display-small',
		'headline-large': 'text-headline-large',
		'headline-medium': 'text-headline-medium',
		'headline-small': 'text-headline-small',
		'title-large': 'text-title-large',
		'title-medium': 'text-title-medium',
		'label-large': 'text-label-large',
		'label-small': 'text-label-small',
		'body-large': 'text-body-large',
		'body-small': 'text-body-small',
	}[variant];

	if (['display-large', 'display-medium', 'display-small'].includes(variant)) {
		return <h1 className={clsx(variantClass, className)}>{children}</h1>
	}

	if (['headline-large', 'headline-medium', 'headline-small'].includes(variant)) {
		return <h2 className={clsx(variantClass, className)}>{children}</h2>
	}

	if (['title-large', 'title-medium'].includes(variant)) {
		return <h3 className={clsx(variantClass, className)}>{children}</h3>
	}

	if (['label-large', 'label-medium'].includes(variant)) {
		return <label className={clsx(variantClass, className)}>{children}</label>
	}

	if (['body-large', 'body-medium'].includes(variant)) {
		return <p className={clsx(variantClass, className)}>{children}</p>
	}
};

export default Typography;