export const upaliGaleriju = (payload) => {
    return {
        type: 'OTVORI',
        payload: payload
    }
}
export const ugasiGaleriju = () => {
    return {
        type: 'UGASI',
    }
}