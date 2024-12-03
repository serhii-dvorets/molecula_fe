import { OrderStatus } from "@/api/Order/types"

type Props = {
    status: OrderStatus
}

export const StatusBadge = ({ status }: Props) => {
	type ColorStatus = 'done' | 'inProgress' | 'reopened' | 'ready' | 'inactive';

	const colorClasses: Record<ColorStatus, string> = {
		done: 'bg-green-100 text-green-800',
		inProgress: 'bg-yellow-100 text-yellow-800',
		reopened: 'bg-red-100 text-red-800',
		ready: 'bg-blue-100 text-blue-800',
		inactive: 'bg-grey-100 text-grey-800',
	};

	const getStatusType = () => {
		let statusType: ColorStatus

		switch (status) {
		case 'pending':
		case 'accepted':
		case 'in-progress':
			statusType = 'inProgress'
			break;
                
		case 'customer-notified':
			statusType = 'ready'
			break;

		case 'ready':
			statusType = 'done'
			break;

		case 'closed':
			statusType = 'inactive'
			break;
        
		case 'reopened':
			statusType = 'reopened'
			break;
        
		default:
			statusType = 'done'
			break;
		}
		return (colorClasses[statusType])
	}

	const STATUS_TRANSLATIONS = {
		pending: 'Прийняте',
		accepted: 'Прийняте',
		'in-progress': 'В роботі',
		'customer-notified': 'Клієнт оповіщений',
		ready: 'Готовий до видачі',
		closed: 'Закрите',
		reopened: 'Перепрання',
	}
    
	return (
		<span
			className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusType()}`}
		>
			{STATUS_TRANSLATIONS[status]}
		</span>
	)
}

