import { Select } from '@chakra-ui/react'
import { useRef } from 'react'

interface Props {
    onOrderSelect: (order: string | undefined) => void
}

const OrderBy = ({ onOrderSelect }: Props) => {
    const orderRef = useRef<HTMLSelectElement>(null)

    return (
        <Select
            ref={orderRef}
            w={{ base: '100%', md: '250px' }}
            onChange={() => onOrderSelect(orderRef.current?.value)}
        >
            <option value="-added">Order by: Date added</option>
            <option value="name">Order by: Name</option>
            <option value="-released">Order by: Release date</option>
            <option value="-metacritic">Order by: Popularity</option>
            <option value="-rating">Order by: Average rating</option>
        </Select>
    )
}

export default OrderBy
